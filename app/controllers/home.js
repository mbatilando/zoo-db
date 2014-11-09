var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  db.Article.findAll().success(function (articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/add/customer', function (req, res, next) {
	res.render('customer/add-customer', {});
});

router.get('/add/zoo', function (req, res, next) {
	res.render('zoo/add-zoo', {});
});

router.get('/add/zookeeper', function (req, res, next) {
  res.render('zookeeper/add-zookeeper', {});
});

router.get('/add/show', function (req, res, next) {
  res.render('show/add-show', {});
});

router.get('/add/animal', function (req, res, next) {
  res.render('animal/add-animal', {});
});

router.get('/add/exhibit', function (req, res, next) {
  res.render('exhibit/add-exhibit', {});
});
