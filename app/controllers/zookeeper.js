var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/zookeeper', router);
};

router.get('/add', function (req, res, next) {
  db['Zoo'].findAll().success(function (zoos) {
    var zoos = zoos;
    res.render('zookeeper/add-zookeeper', {user: req.session.username, zoos: zoos});
  });
});

router.get('/:id', function (req, res, next) {
  db['Zookeeper'].find({ where: { id: req.params.id }}).success(function (zookeeper) {
    res.render('zookeeper/view-zookeeper', { zookeeper: zookeeper, user: req.session.username });
  });
});

router.get('/', function (req, res, next) {
  db['Zookeeper'].findAll({ order: 'id ASC' }).success(function (Zookeepers) {
    res.render('zookeeper/view-zookeepers', { Zookeepers: Zookeepers, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  req.body.work_days = req.body.work_days.join(' ');
  console.log(req.body);
  db['Zookeeper'].create(req.body).success(function (zookeeper) {
    db['Zookeeper'].findAll().success(function (zookeepers) {
      req.dataProcessed = zookeepers;
      viewZookeepers(req, res);
    });
  });
});

function viewZookeepers (req, res) {
  var context = req.dataProcessed;
  res.render('zookeeper/view-zookeepers', { Zookeepers: context });
}

router.put('/:id', function (req, res, next) {
  db['Zookeeper'].find({ where: { id: req.params.id }}).success(function (zookeeper) {
    zookeeper.updateAttributes(req.body).success(function (zookeepers) {
      db['Zookeeper'].findAll().success(function (zookeepers) {
        req.dataProcessed = zookeepers;
        viewZookeepers(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Zookeeper'].find({ where: { id: req.params.id }}).success(function (zookeepers) {
    zookeepers.destroy().success(function () {
      res.send(200);
      viewZookeepers(req, res);
    });
  });
});