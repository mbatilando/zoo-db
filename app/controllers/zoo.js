var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    moment = require('moment');

module.exports = function (app) {
  app.use('/zoo', router);
};

router.get('/add', function (req, res, next) {
  if (req.session.username) {
    var username = req.session.username;
  }
	res.render('zoo/add-zoo', { user: username, user: req.session.username });
});

router.get('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoo) {
    res.render('zoo/view-zoo', { zoo: zoo, user: req.session.username });
  });
});

router.get('/', function (req, res, next) {
  db['Zoo'].findAll({ order: 'id ASC' }).success(function (Zoos) {
    // for (var i = 0, len = Zoos.length; i < len; i++) {
    //   Zoos[i].opening_time = moment(new Date(Zoos[i].opening_time).getTime()).format('h:mm:ss a');
    //   Zoos[i].closing_time = moment(Zoos[i].closing_time).format('h:mm:ss a');
    // }
    res.render('zoo/view-zoos', { Zoos: Zoos, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  db['Zoo'].create(req.body).success(function (zoo) {
    db['Zoo'].findAll().success(function (zoos) {
      req.dataProcessed = zoos;
      viewZoos(req, res);
    });
  });
});

function viewZoos (req, res) {
  var context = req.dataProcessed;
  res.render('zoo/view-zoos', { Zoos: context });
}

router.put('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoo) {
    zoo.updateAttributes(req.body).success(function (zoos) {
      db['Zoo'].findAll().success(function (zoos) {
        req.dataProcessed = zoos;
        viewZoos(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoos) {
    zoos.destroy().success(function () {
      res.send(200);
      viewZoos(req, res);
    });
  });
});