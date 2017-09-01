const knex = require('../database').knex;
const bookshelf = require('bookshelf')(knex);
const jsonColumns = require('bookshelf-json-columns');
bookshelf.plugin(jsonColumns);
bookshelf.plugin('virtuals');

module.exports = bookshelf.Model.extend({
  'tableName': 'submissions',
  'hasTimestamps': true,
  'reviews': function() {
    const Review = require('./review');
    return this.hasMany(Review);
  },
  'initialize': function() {
    this.on('created',function() {
      const User = require('./user');
      const Review = require('./review');
      return User.nextAvailableUser()
        .then((user) => {
          if (user) {
            return new Review({
              'user_id': user.get('id'),
              'submission_id': this.get('id')
            }).save();
          } else {
            throw new Error('No users ready!');
          }
        })
    },this);
    bookshelf.Model.prototype.initialize.apply(this, arguments);
  },
  'virtuals': {
    'score': function() {
      //TODO make this a join
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
  'jsonColumns': ['data'],
  'all': function() {
    return this
      .forge()
      .orderBy('created_at','DESC')
      .fetchAll({
        'withRelated': 'reviews'
      });
  },
  'byId': function(id) {
    return this.forge().query((qb) => {
      qb.where('id',id);
    }).fetch();
  },
  'bySourceAndExternalId': function(source,externalId) {
    return this
      .forge()
      .query({
        'where': {
          'source': source,
          'external_id': externalId
        }
      })
      .fetch()
  }
});
