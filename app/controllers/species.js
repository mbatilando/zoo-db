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
  db['Species'].findAll().success(function (Species) {
    res.render('species/view-species', { Species: Species });
  });
});
