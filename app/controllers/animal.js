var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/animal', router);
};

router.get('/add', function (req, res, next) {
  res.render('animal/add-animal', {});
});

router.get('/:id', function (req, res, next) {
  db['Animal'].find({ where: { id: req.params.id }}).success(function (animal) {
    res.render('animal/view-animal', { animal: animal });
  });
});

router.get('/', function (req, res, next) {
  db['Animal'].findAll({ order: 'id ASC' }).success(function (Animals) {
    res.render('animal/view-animals', { Animals: Animals });
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
  res.render('animal/view-animals', { Animals: context });
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