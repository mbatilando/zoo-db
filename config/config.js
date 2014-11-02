var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'info257test'
    },
    port: 3000,
    db: 'postgres://localhost/Mari'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'info257test'
    },
    port: 3000,
    db: 'postgres://localhost/info257test-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'info257test'
    },
    port: 3000,
    db: 'postgres://localhost/info257test-production'
    
  }
};

module.exports = config[env];
