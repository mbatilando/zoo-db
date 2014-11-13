var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {});
});

router.get('/add/customer', function (req, res, next) {
	res.render('customer/add-customer', {});
});

router.get('/view/customers', function (req, res, next) {
  db['Zoo Customer'].findAll().success(function (ZooCustomers) {
    res.render('customer/view-customers', { ZooCustomers: ZooCustomers });
  });
});

router.get('/add/zoo', function (req, res, next) {
	res.render('zoo/add-zoo', {});
});

router.get('/view/zoos', function (req, res, next) {
  db['Zoo'].findAll().success(function (Zoos) {
    res.render('zoo/view-zoos', { Zoos: Zoos });
  });
});

router.get('/add/zookeeper', function (req, res, next) {
  res.render('zookeeper/add-zookeeper', {});
});

router.get('/view/zookeepers', function (req, res, next) {
  db['Zookeeper'].findAll().success(function (Zookeepers) {
    res.render('zookeeper/view-zookeepers', { Zookeepers: Zookeepers });
  });
});

router.get('/add/show', function (req, res, next) {
  res.render('show/add-show', {});
});

router.get('/view/shows', function (req, res, next) {
  db['Show'].findAll().success(function (Shows) {
    res.render('show/view-shows', { Shows: Shows });
  });
});

router.get('/add/animal', function (req, res, next) {
  res.render('animal/add-animal', {});
});

router.get('/view/animals', function (req, res, next) {
  db['Animal'].findAll().success(function (Animals) {
    res.render('animal/view-animals', { Animals: Animals });
  });
});

router.get('/add/exhibit', function (req, res, next) {
  res.render('exhibit/add-exhibit', {});
});

router.get('/view/exhibits', function (req, res, next) {
  db['Exhibit'].findAll().success(function (Exhibits) {
    res.render('exhibit/view-exhibits', { Exhibits: Exhibits });
  });
});

router.get('/add/zoo-membership', function (req, res, next) {
  res.render('zoo-membership/add-zoo-membership', {});
});

router.get('/view/zoo-memberships', function (req, res, next) {
  db['ZooMembership'].findAll().success(function (ZooMemberships) {
    res.render('zoo-membership/view-zoo-memberships', { ZooMemberships: ZooMemberships });
  });
});

router.get('/add/species', function (req, res, next) {
  res.render('species/add-species', {});
});

router.get('/view/species', function (req, res, next) {
  db['Species'].findAll().success(function (Species) {
    res.render('species/view-species', { Species: Species });
  });
});
