var express = require('express'),
    router = express.Router(),
    db = require('../models');

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}

module.exports = function (app) {
  app.use('/animal', router);
};

router.get('/add', function (req, res, next) {
  db['Exhibit'].findAll().success(function (exhibits) {
    db['Species'].findAll({order: 'common_name DESC'}).success(function (species) {
      res.render('animal/add-animal', { user: req.session.username, exhibits: exhibits, species: species });
    });
  });
});

router.get('/:id', function (req, res, next) {
  db['Exhibit'].findAll().success(function (exhibits) {
    db['Species'].findAll({order: 'common_name DESC'}).success(function (species) {
      db['Animal'].find({ where: { id: req.params.id }}).success(function (animal) {
        res.render('animal/view-animal', { animal: animal, user: req.session.username, exhibits: exhibits, species: species });
      });
    });
  });
});

router.get('/', function (req, res, next) {
  db['Animal'].findAll({ order: 'id ASC' }).success(function (Animals) {
    res.render('animal/view-animals', { Animals: Animals, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  db['Animal'].create(req.body).success(function (animal) {
    db['Animal'].findAll().success(function (animals) {
      req.dataProcessed = animals;
      viewAnimals(req, res);
    });
  });
});

function viewAnimals (req, res) {
  var context = req.dataProcessed;
  res.render('animal/view-animals', { Animals: context, user: req.session.username });
}

router.put('/:id', function (req, res, next) {
  db['Animal'].find({ where: { id: req.params.id }}).success(function (animal) {
    animal.updateAttributes(req.body).success(function (animal) {
      db['Animal'].findAll().success(function (animals) {
        req.dataProcessed = animals;
        viewAnimals(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Animal'].find({ where: { id: req.params.id }}).success(function (animal) {
    animal.destroy().success(function () {
      res.send(200);
      viewAnimals(req, res);
    });
  });
});