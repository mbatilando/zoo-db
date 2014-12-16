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
          .query('SELECT COUNT(*) FROM "ZooMemberships" WHERE "ZooMemberships"."ZooId" = ' + req.params.zooId + ';')
          .success(function (result) {
            values.numZooMemberships = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ';')
          .success(function (result) {
            console.log(result);
            values.numZooKeepers = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers", "Exhibits" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId";')
          .success(function (result) {
            console.log(result);
            values.numExhibits = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId";')
          .success(function (result) {
            console.log(result);
            values.numAnimals = result[0].count;
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."SpeciesId") AS subquery;')
          .success(function (result) {
            values.numSpecies = result[0].count;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."SpeciesId") AS subquery;')
          .success(function (result) {
            values.numSpecies = result[0].count;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Shows" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Shows"."ExhibitId";')
          .success(function (result) {
            values.numShows = result[0].count;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT AVG(subquery.count) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."ExhibitId") AS subquery;')
          .success(function (result) {
            values.avgNumAnimalsPerExhibit = result[0].avg;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT AVG(subquery.count) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."SpeciesId") AS subquery;')
          .success(function (result) {
            values.avgNumAnimalsPerSpecies = result[0].avg;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT "Animals".given_name, "Species".common_name, "Animals".weight FROM "Zookeepers", "Exhibits", "Animals", "Species" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" AND "Animals"."SpeciesId" = "Species".id ORDER BY "Animals".weight LIMIT 1;')
          .success(function (result) {
            console.log(result);
            values.animalLowestWeight = {};
            values.animalLowestWeight.given_name = result[0].given_name;
            values.animalLowestWeight.common_name = result[0].common_name;
            values.animalLowestWeight.weight = result[0].weight;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT "Animals".given_name, "Species".common_name, "Animals".weight FROM "Zookeepers", "Exhibits", "Animals", "Species" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" AND "Animals"."SpeciesId" = "Species".id ORDER BY "Animals".weight DESC LIMIT 1;')
          .success(function (result) {
            values.animalHighestWeight = {};
            values.animalHighestWeight.given_name = result[0].given_name;
            values.animalHighestWeight.common_name = result[0].common_name;
            values.animalHighestWeight.weight = result[0].weight;
            console.log(values);
            res.render('admin-dashboard/dashboard', { user: req.session.username, values: values });
            callback();
          })
    }
  ]);
});