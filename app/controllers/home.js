var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  // db.Article.findAll().success(function (articles) {
  //   res.render('index', {
  //     title: 'Generator-Express MVC',
  //     articles: articles
  //   });
  // });
  res.render('index', {});
});

router.get('/add/customer', function (req, res, next) {
	res.render('customer/add-customer', {});
});

router.get('/view/customers', function (req, res, next) {
  res.render('customer/view-customers', {});
});

router.get('/add/zoo', function (req, res, next) {
	res.render('zoo/add-zoo', {});
});

router.get('/view/zoos', function (req, res, next) {
  res.render('zoo/view-zoos', {});
});

router.get('/add/zookeeper', function (req, res, next) {
  res.render('zookeeper/add-zookeeper', {});
});

router.get('/view/zookeepers', function (req, res, next) {
  res.render('zookeeper/view-zookeepers', {});
});

router.get('/add/show', function (req, res, next) {
  res.render('show/add-show', {});
});

router.get('/view/shows', function (req, res, next) {
  res.render('show/view-shows', {});
});

router.get('/add/animal', function (req, res, next) {
  res.render('animal/add-animal', {});
});

router.get('/view/animals', function (req, res, next) {
  res.render('animal/view-animals', {});
});

router.get('/add/exhibit', function (req, res, next) {
  res.render('exhibit/add-exhibit', {});
});

router.get('/view/exhibits', function (req, res, next) {
  res.render('exhibit/view-exhibits', {});
});

router.get('/add/zoo-membership', function (req, res, next) {
  res.render('zoo-membership/add-zoo-membership', {});
});

router.get('/view/zoo-memberships', function (req, res, next) {
  res.render('zoo-membership/view-zoo-memberships', {});
});

router.get('/add/species', function (req, res, next) {
  res.render('species/add-species', {});
});
router.get('/view/species', function (req, res, next) {
  res.render('species/view-species', {});
});
