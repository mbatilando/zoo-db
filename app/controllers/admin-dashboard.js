var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    async = require('async');

// function authenticate (req) {
//   if (!req.session.username || !req.session.user_type) {
//     return false;
//   }
//   return true;
// }

module.exports = function (app) {
  app.use('/admin/dashboard', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}

router.get('/:zooId', function (req, res, next) {
  // if (!authenticate(req)) return res.redirect('/authentication/login');
  var values = {};
  async.series([
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "ZooMemberships" WHERE "ZooMemberships"."ZooId" = 1;')
          .success(function (result) {
            values.numZooMemberships = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers" WHERE "Zookeepers"."ZooId" = 1;')
          .success(function (result) {
            console.log(result);
            values.numZooKeepers = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers", "Exhibits" WHERE "Zookeepers"."ZooId" = 1 AND "Zookeepers".id = "Exhibits"."ZookeeperId";')
          .success(function (result) {
            console.log(result);
            values.numExhibits = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = 1 AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId";')
          .success(function (result) {
            console.log(result);
            values.numAnimals = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = 1 AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."SpeciesId") AS subquery;')
          .success(function (result) {
            values.numSpecies = result[0].count;
            console.log(values);
            res.render('admin-dashboard/dashboard', { user: req.session.username, values: values });
            callback();
          })
    }
  ]);
});