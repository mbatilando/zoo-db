var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/exhibit', router);
};


router.get('/add', function (req, res, next) {
  res.render('exhibit/add-exhibit', {});
});

router.get('/:id', function (req, res, next) {
  db['Exhibit'].find({ where: { id: req.params.id }}).success(function (exhibit) {
    res.render('exhibit/view-exhibit', { exhibit: exhibit });
  });
});

router.get('/', function (req, res, next) {
  db['Exhibit'].findAll().success(function (Exhibits) {
    res.render('exhibit/view-exhibits', { Exhibits: Exhibits });
  });
});