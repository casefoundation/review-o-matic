const knex = require('../database').knex;
const bookshelf = require('bookshelf')(knex);
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const Notification = require('./notification');
const randomstring = require('randomstring');
bookshelf.plugin('virtuals');

const User = module.exports = bookshelf.Model.extend({
  'tableName': 'users',
  'hasTimestamps': true,
  'reviews': function() {
    const Review = require('./review');
    return this.hasMany(Review);
  },
  'notifications': function() {
    return this.hasMany(Notification);
  },
  'favorites': function() {
    const Submission = require('./submission');
    const Favorite = require('./favorite');
    return this.belongsToMany(Submission).through(Favorite);
  },
  'verifyPassword': function(password) {
    return bcrypt.compareSync(password,this.get('password'));
  },
  'setPassword': function(password) {
    this.set('password',bcrypt.hashSync(password,10));
  },
  'resetAccount': function() {
    this.set('resetCode',uuidv4());
    this.set('resetExpiration', new Date(new Date().getTime() + (1000 * 60 * 60 * 24)));
    return this.save()
      .then(() => {
        return Notification.userAccountReset(this).save();
      });
  },
  'isAdmin': function() {
    return this.get('role') === 'admin';
  },
  'getUserPermissions': function(user) {
    if (this.isAdmin() || user.get('id') === this.get('id')) {
      return {
        'view': true,
        'edit': true
      };
    } else {
      return {
        'view': false,
        'edit': false
      };
    }
  },
  'getReviewPermissions': function(review) {
    if (this.isAdmin() || (review.get('user_id') === this.get('id') && review.get('score') === null)) { //TODO test
      return {
        'view': true,
        'edit': true
      };
    } else {
      return {
        'view': false,
        'edit': false
      };
    }
  },
  'getSubmissionPermissions': function(submission) {
    if (this.isAdmin()) {
      return {
        'view': true,
        'edit': true
      };
    } else {
      return {
        'view': true,
        'edit': false
      };
    }
  },
  'recuseAllReviews': function() {
    const nextRecusal = (i) => {
      if (i < this.related('reviews').length) {
        const review = this.related('reviews').at(i);
        return review
          .recuse()
          .then(() => {
            return review.save();
          })
          .then(() => {
            return nextRecusal(i+1);
          })
      }
    }
    return nextRecusal(0)
      .then(() => {
        return this.fetch({'withRelated':'reviews'})
      })
  },
  'toJSON': function(options) {
    const sendOpts = options ? Object.assign(options,{'virtuals': true}) : {'virtuals': true};
    const json = bookshelf.Model.prototype.toJSON.apply(this,sendOpts);
    json.active = json.active === true || json.active === 1;
    json.ready = json.ready === true || json.ready === 1;
    delete json.password;
    delete json.resetCode;
    delete json.resetExpiration;
    delete json.reviews;
    return json;
  },
  'virtuals': {
    'pendingReviews': function() {
      const reviews = this.related('reviews');
      if (reviews && reviews.length > 0) {
        return reviews.filter((review) => review.get('score') === null).length;
      } else {
        return 0;
      }
    },
    'completedReviews': function() {
      const reviews = this.related('reviews');
      if (reviews && reviews.length > 0) {
        return reviews.filter((review) => review.get('score') !== null).length;
      } else {
        return 0;
      }
    },
    'averageScore': function() {
      const reviews = this.related('reviews');
      if (reviews && reviews.length > 0) {
        return reviews.reduce((last,current) => {
          return last + current.score;
        },0) / reviews.length;
      } else {
        return null;
      }
    }
  }
}, {
  'byEmail': function(email) {
    return this.forge().query({where:{ email: email }}).fetch({'withRelated':'reviews'});
  },
  'byCode': function(code) {
    return this.forge()
      .query((qb) => {
        qb.where('resetCode',code);
        qb.where('resetExpiration','>=',new Date());
      })
      .fetch()
  },
  'byId': function(id) {
    return this.forge().query({where:{ id: id }}).fetch({'withRelated':['reviews']});
  },
  'byIds': function(ids) {
    return this.forge().query((qb) => qb.whereIn('id',ids)).fetchAll({'withRelated':'reviews'});
  },
  'all': function() {
    return this.forge().fetchAll({'withRelated':'reviews'});
  },
  'nextAvailableUsers': function(i,blacklist) {
    return User.forge()
      .query((qb) => {
        qb.whereNotIn('id',knex.select('user_id').from('reviews').whereNull('reviews.score'));
        if (blacklist && blacklist.length > 0) qb.whereNotIn('id',blacklist);
        qb.where({
          'ready': true,
          'active': true
        });
        qb.limit(i);
      })
      .fetchAll()
      .then((users) => {
        if (users.length == i) {
          return users;
        } else {
          const query = knex.select(knex.raw('users.id, count(reviews.user_id) as totalReviews'))
            .from('users')
            .leftJoin('reviews','users.id','reviews.user_id')
            .whereNull('reviews.score')
            .where({
              'users.ready': true,
              'users.active': true
            })
            .groupBy('reviews.user_id')
            .orderBy('totalReviews')
            .limit(i - users.length);
          if (blacklist && blacklist.length > 0) query.whereNotIn('users.id',blacklist);
          return query
            .then((result) => {
              if (result && result.length > 0) {
                return User.byIds(result.map((row) => row.id));
              } else {
                return null;
              }
            })
            .then((additionalUsers) => {
              if (additionalUsers) {
                additionalUsers.forEach((user) => {
                  users.add(user);
                });
              }
              return users;
            });
        }
      });
  },
  'seedAdmin': function() {
    return this.forge()
      .query({'where':{'role':'admin'}})
      .fetchAll()
      .then((users) => {
        if (!users || users.length == 0) {
          const user = new User({
            'email': 'johnj@casefoundation.org',
            'role': 'admin',
            'active': true
          });
          const password = randomstring.generate();
          user.setPassword(password)
          return user.save().then(() => {
            console.log('Seeded an admin user:\nEmail: ' + user.get('email') + '\nPassword: ' + password);
          });
        }
      });
  }
});
