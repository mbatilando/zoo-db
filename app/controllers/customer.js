var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/customer', router);
};

router.get('/add', function (req, res, next) {
	res.render('customer/add-customer', {});
});

router.get('/:id', function (req, res, next) {
  db['Zoo Customer'].find({ where: { id: req.params.id }}).success(function (customer) {
    res.render('customer/view-customer', { customer: customer });
  });
});

router.get('/', function (req, res, next) {
  db['Zoo Customer'].findAll().success(function (ZooCustomers) {
    res.render('customer/view-customers', { ZooCustomers: ZooCustomers });
  });
});