var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Zoo DB Dev'
    },
    port: 3000,
    db: 'postgres://localhost/Mari'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'Zoo DB Test'
    },
    port: 3000,
    db: 'postgres://localhost/info257test-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'Zoo DB Prod'
    },
    port: 3000,
    db: 'postgres://kupehbzbjzufdf:ck_UuGKW6aGE5CRiYcyLeAj8wM@ec2-54-235-250-41.compute-1.amazonaws.com:5432/d2lt4df5854guc'
    
  }
};

module.exports = config[env];
