var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/zoo', router);
};

router.get('/add', function (req, res, next) {
	res.render('zoo/add-zoo', {});
});

router.get('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoo) {
    res.render('zoo/view-zoo', { zoo: zoo });
  });
});

router.get('/', function (req, res, next) {
  db['Zoo'].findAll().success(function (Zoos) {
    res.render('zoo/view-zoos', { Zoos: Zoos });
  });
});
