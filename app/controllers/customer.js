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
  db['Zoo Customer'].findAll({ order: 'id ASC' }).success(function (ZooCustomers) {
    res.render('customer/view-customers', { ZooCustomers: ZooCustomers });
  });
});

router.post('/', function (req, res, next) {
  db['Zoo Customer'].create(req.body).success(function (zooCustomer) {
    db['Zoo Customer'].findAll().success(function (zooCustomers) {
      req.dataProcessed = zooCustomers;
      viewZooCustomers(req, res);
    });
  });
});

function viewZooCustomers (req, res) {
  var context = req.dataProcessed;
  res.render('customer/view-customers', { ZooCustomers: context });
}

router.put('/:id', function (req, res, next) {
  db['Zoo Customer'].find({ where: { id: req.params.id }}).success(function (zooCustomer) {
    zooCustomer.updateAttributes(req.body).success(function (zooCustomer) {
      db['Zoo Customer'].findAll().success(function (zooCustomers) {
        req.dataProcessed = zooCustomers;
        viewZooCustomers(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Zoo Customer'].find({ where: { id: req.params.id }}).success(function (zooCustomer) {
    zooCustomer.destroy().success(function () {
      res.send(200);
      viewZooCustomers(req, res);
    });
  });
});