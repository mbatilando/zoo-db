var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/zoo-membership', router);
};

router.get('/add', function (req, res, next) {
  db['Zoo'].findAll().success(function (zoos) {
    var zoos = zoos;
    db['Zoo Customer'].findAll().success(function (zooCustomers) {
      var zooCustomers = zooCustomers;
      res.render('zoo-membership/add-zoo-membership', {user: req.session.username, zoos: zoos, zooCustomers: zooCustomers});
    });
  });
});

router.get('/:id', function (req, res, next) {
  db['ZooMembership'].find({ where: { id: req.params.id }}).success(function (zooMembership) {
    res.render('zoo-membership/view-zoo-membership', { zooMembership: zooMembership, user: req.session.username });
  });
});

router.get('/', function (req, res, next) {
  db['ZooMembership'].findAll({ order: 'id ASC' }).success(function (ZooMemberships) {
    res.render('zoo-membership/view-zoo-memberships', { ZooMemberships: ZooMemberships, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  db['ZooMembership'].create(req.body).success(function (zooMembership) {
    db['ZooMembership'].findAll().success(function (zooMemberships) {
      req.dataProcessed = zooMemberships;
      viewZooMemberships(req, res);
    });
  });
});

function viewZooMemberships (req, res) {
  var context = req.dataProcessed;
  res.render('zoo-membership/view-zoo-memberships', { ZooMemberships: context });
}

router.put('/:id', function (req, res, next) {
  db['ZooMembership'].find({ where: { id: req.params.id }}).success(function (zooMembership) {
    zooMembership.updateAttributes(req.body).success(function (zooMemberships) {
      db['ZooMembership'].findAll().success(function (zooMemberships) {
        req.dataProcessed = zooMemberships;
        viewZooMemberships(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['ZooMembership'].find({ where: { id: req.params.id }}).success(function (zooMemberships) {
    zooMemberships.destroy().success(function () {
      res.send(200);
      viewZooMemberships(req, res);
    });
  });
});