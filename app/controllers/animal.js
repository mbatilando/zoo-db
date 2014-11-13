var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/animal', router);
};


router.get('/animal/add', function (req, res, next) {
  res.render('animal/add-animal', {});
});

router.get('/:id', function (req, res, next) {
  db['Animal'].find({ where: { id: req.params.id }}).success(function (animal) {
    res.render('animal/view-animal', { animal: animal });
  });
});

router.get('/', function (req, res, next) {
  db['Animal'].findAll().success(function (Animals) {
    res.render('animal/view-animals', { Animals: Animals });
  });
});