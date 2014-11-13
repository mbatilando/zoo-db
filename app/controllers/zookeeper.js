var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/zookeeper', router);
};

router.get('/add', function (req, res, next) {
  res.render('zookeeper/add-zookeeper', {});
});

router.get('/:id', function (req, res, next) {
  db['Zookeeper'].find({ where: { id: req.params.id }}).success(function (zookeeper) {
    res.render('zookeeper/view-zookeeper', { zookeeper: zookeeper });
  });
});

router.get('/', function (req, res, next) {
  db['Zookeeper'].findAll().success(function (Zookeepers) {
    res.render('zookeeper/view-zookeepers', { Zookeepers: Zookeepers });
  });
});