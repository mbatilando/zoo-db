var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/zoo-membership', router);
};

router.get('/add', function (req, res, next) {
  res.render('zoo-membership/add-zoo-membership', {});
});

router.get('/:id', function (req, res, next) {
  db['ZooMembership'].find({ where: { id: req.params.id }}).success(function (zooMembership) {
    res.render('zoo-membership/view-zoo-membership', { zooMembership: zooMembership });
  });
});

router.get('/', function (req, res, next) {
  db['ZooMembership'].findAll().success(function (ZooMemberships) {
    res.render('zoo-membership/view-zoo-memberships', { ZooMemberships: ZooMemberships });
  });
});
