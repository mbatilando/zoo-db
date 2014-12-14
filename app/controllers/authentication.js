var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/authentication', router);
};

router.put('/login', function (req, res, next) {
  db['Zoo Customer'].find({ where: { id: req.params.id }}).success(function (zooCustomer) {
    zooCustomer.updateAttributes(req.body).success(function (zooCustomer) {
      db['Zoo Customer'].findAll().success(function (zooCustomers) {
        req.dataProcessed = zooCustomers;
        viewZooCustomers(req, res);
      });
    });
  });
});