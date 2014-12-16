var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    async = require('async'),
    _ = require('lodash');

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

router.get('/', function (req, res, next) {
  res.render('admin-dashboard/search', {});
});

router.get('/api/:zooId', function (req, res, next) {
  var zoo = {};
  zoo.children = []; // Zookeepers
  db.sequelize
    .query('SELECT "Zooes".name, "Zookeepers".first_name, "Zookeepers".last_name, "Exhibits".name, "Species".common_name, "Animals".given_name FROM "Zooes", "Zookeepers", "Exhibits", "Animals", "Species" WHERE "Zooes".id = ' + req.params.zooId + ' AND "Zooes".id = "Zookeepers"."ZooId" AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" AND "Animals"."SpeciesId" = "Species".id ORDER BY "Zookeepers".first_name, "Zookeepers".last_name, "Exhibits".name, "Species".common_name, "Animals".given_name;')
    .success(function (result) {
      var origResult = result;
      for (var i = 0, len = origResult.length; i < len; i++) {
        if (_.findIndex(zoo.children, { name: origResult[i].first_name + ' ' + origResult[i].last_name }) === -1) {
          zoo.children.push({ name: origResult[i].first_name + ' ' + origResult[i].last_name, children: []})
        }
      }
      for (var i = 0, len = zoo.children.length; i < len; i++) {
        for (var j = 0, jLen = origResult.length; j < jLen; j++) {
          if (zoo.children[i].name.indexOf(origResult[j].last_name) > -1) {
            // Check if exhibit hasn't been added yet
            if (_.findIndex(zoo.children[i].children, { name: origResult[j].name }) === -1) {
              zoo.children[i].children.push({ name: origResult[j].name, children: []})
            }
          }
        }
        for (var j = 0, jLen = zoo.children[i].children.length; j < jLen; j++) {
          for (var k = 0, kLen = origResult.length; k < kLen; k++) {
            if (zoo.children[i].children[j].name === origResult[k].name) {
              if (_.findIndex(zoo.children[i].children[j].children, { name: origResult[k].common_name }) === -1) {
                zoo.children[i].children[j].children.push({ name: origResult[k].common_name, children: []});
              }
            }
          }
        }
        for (var j = 0, jLen = zoo.children[i].children.length; j < jLen; j++) {
          for (var k = 0, kLen = zoo.children[i].children[j].children.length; k < kLen; k++) {
            for(var l = 0, lLen = origResult.length; l < lLen; l++) {
              if (zoo.children[i].children[j].children[k].name === origResult[l].common_name) {
                if (_.findIndex(zoo.children[i].children[j].children[k].children, { name: origResult[l].given_name }) === -1) {
                  zoo.children[i].children[j].children[k].children.push({ name: origResult[l].given_name});
                }
              }
            }
          }
        }
      }
      db['Zoo'].find({where: {id: req.params.zooId}}).success(function (dZoo) {
        zoo.name = dZoo.name;
        res.json(zoo);
      });
    })
});

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
          .query('SELECT ROUND(AVG(subquery.count), 2) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."ExhibitId") AS subquery;')
          .success(function (result) {
            values.avgNumAnimalsPerExhibit = result[0].round;
            console.log(values);
            callback();
          })
    },
    function (callback) {
      db.sequelize
          .query('SELECT ROUND(AVG(subquery.count), 2) FROM (SELECT COUNT(*) FROM "Zookeepers", "Exhibits", "Animals" WHERE "Zookeepers"."ZooId" = ' + req.params.zooId + ' AND "Zookeepers".id = "Exhibits"."ZookeeperId" AND "Exhibits".id = "Animals"."ExhibitId" GROUP BY "Animals"."SpeciesId") AS subquery;')
          .success(function (result) {
            values.avgNumAnimalsPerSpecies = result[0].round;
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
            callback();
          })
    },
    function (callback) {
      db['Zoo'].find({where:{id:req.params.zooId}}).success(function (zoo) {
        values.zooName = zoo.name;
        values.zooId = zoo.id;
        res.render('admin-dashboard/zoo', { user: req.session.username, values: values });
      });
    }
  ]);
});