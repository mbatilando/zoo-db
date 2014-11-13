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
  db['Show'].findAll().success(function (Shows) {
    res.render('show/view-shows', { Shows: Shows });
  });
});