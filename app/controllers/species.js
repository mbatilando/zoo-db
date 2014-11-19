var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/species', router);
};

router.get('/add', function (req, res, next) {
  res.render('species/add-species', {});
});

router.get('/:id', function (req, res, next) {
  db['Species'].find({ where: { id: req.params.id }}).success(function (specie) {
    res.render('species/view-specie', { specie: specie });
  });
});

router.get('/', function (req, res, next) {
  db['Species'].findAll({ order: 'id ASC' }).success(function (Species) {
    res.render('species/view-species', { Species: Species });
  });
});

router.post('/', function (req, res, next) {
  db['Species'].create(req.body).success(function (specie) {
    db['Species'].findAll().success(function (species) {
      req.dataProcessed = species;
      viewSpecies(req, res);
    });
  });
});

function viewSpecies (req, res) {
  var context = req.dataProcessed;
  res.render('species/view-species', { Species: context });
}

router.put('/:id', function (req, res, next) {
  db['Species'].find({ where: { id: req.params.id }}).success(function (specie) {
    specie.updateAttributes(req.body).success(function (species) {
      db['Species'].findAll().success(function (species) {
        req.dataProcessed = species;
        viewSpecies(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Species'].find({ where: { id: req.params.id }}).success(function (species) {
    species.destroy().success(function () {
      res.send(200);
      viewSpecies(req, res);
    });
  });
});