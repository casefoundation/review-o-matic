['review','submission','user'].forEach((lib) => {
  exports[lib] = require('./'+lib);
})