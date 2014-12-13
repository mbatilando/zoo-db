var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/show', router);
};


router.get('/add', function (req, res, next) {
  res.render('show/add-show', {});
});

router.get('/:id', function (req, res, next) {
  db['Show'].find({ where: { id: req.params.id }}).success(function (show) {
    res.render('show/view-show', { show: show });
  });
});

router.get('/', function (req, res, next) {
  db['Show'].findAll({ order: 'id ASC' }).success(function (Shows) {
    res.render('show/view-shows', { Shows: Shows });
  });
});

router.post('/', function (req, res, next) {
  db['Show'].create(req.body).success(function (show) {
    db['Show'].findAll().success(function (shows) {
      req.dataProcessed = shows;
      viewShows(req, res);
    });
  });
});

function viewShows (req, res) {
  var context = req.dataProcessed;
  res.render('show/view-shows', { Shows: context });
}

router.put('/:id', function (req, res, next) {
  db['Show'].find({ where: { id: req.params.id }}).success(function (show) {
    show.updateAttributes(req.body).success(function (show) {
      db['Show'].findAll().success(function (shows) {
        req.dataProcessed = shows;
        viewShows(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Show'].find({ where: { id: req.params.id }}).success(function (show) {
    show.destroy().success(function () {
      res.send(200);
      viewShows(req, res);
    });
  });
});