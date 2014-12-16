var express = require('express'),
    router = express.Router(),
    db = require('../models');

// function authenticate (req) {
//   if (!req.session.username || !req.session.user_type) {
//     return false;
//   }
//   return true;
// }

module.exports = function (app) {
  app.use('/search', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}

router.get('/', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  if (isEmpty(req.query)) {
    return res.render('animal/search-animal-main', {});
  }

  var entity = req.query.entity,
      attribute = req.query.attr,
      value = req.query.value;

  var query = {};
  query[attribute] = value;

  if(attribute === 'species') {
    db['Species'].find({ where: { common_name: req.query.value },
                         include: [{ model: db['Animal']}]}).success(function (result) {
                          res.render('animal/search-animal-sub', { results: result.animals });
                      });
  } else {
    db[entity].findAll({ where: query }).success(function (results) {
      res.render('animal/search-animal-sub', { results: results });
    });
  }

  // db['Animal'].findAll().success(function (results) {
  //   res.render('animal/search-animal-sub', { results: results });
  // });
});

router.get('/api/:animalId', function (req, res, next) {
  var json = {};
      json.children = [];

  db['Animal'].find({ where: { id: req.params.animalId }}).success(function (animal) {
    db['Species'].find({ where: { id: animal.SpeciesId },
                         include: [{ model: db['Animal']}]}).success(function (result) {
      json.children.push({ name: result.common_name, children: [] })
      for (var i = 0, len = result.animals.length; i < len; i++) {
        if (result.animals[i].id == req.params.animalId) {
          json.children[0].children.push({ id: result.animals[i].id, name: result.animals[i].given_name, icon: result.animals[i].picture_url })
          result.animals.splice(i, 1);
          break;
        }
      }
      var counter = 1;
      while (result.animals.length && counter <= 3) {
        var randomIndex = getRandomArbitrary(0, result.animals.length);
        json.children[0].children.push({ id: result.animals[randomIndex].id, name: result.animals[randomIndex].given_name, icon: result.animals[randomIndex].picture_url });
        result.animals.splice(randomIndex, 1);
        counter++;
      }
      // var randomIndex = getRandomArbitrary(0, result.animals.length);
      // json.children[0].children.push({ name: result.animals[randomIndex].given_name, icon: result.animals[randomIndex].picture_url })
      // randomIndex = getRandomArbitrary(0, result.animals.length);
      // json.children[0].children.push({ name: result.animals[randomIndex].given_name, icon: result.animals[randomIndex].picture_url })

      db['Exhibit'].find({ where: { id: animal.ExhibitId }}).success(function (exhibit) {
        json.name = exhibit.name;
        res.json(json);
      });
    });
  });
});

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}