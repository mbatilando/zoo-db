var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/exhibit', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}


router.get('/add', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Zookeeper'].findAll().success(function (zookeepers) {
    res.render('exhibit/add-exhibit', { zookeepers: zookeepers, user: req.session.username });
  });
});

router.get('/:id', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Zookeeper'].findAll().success(function(zookeepers) {
    db['Exhibit'].find({ where: { id: req.params.id }}).success(function (exhibit) {
      res.render('exhibit/view-exhibit', { exhibit: exhibit, user: req.session.username, zookeepers: zookeepers });
    });
  });
});

router.get('/', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].findAll({ order: 'id ASC' }).success(function (Exhibits) {
    res.render('exhibit/view-exhibits', { Exhibits: Exhibits, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].create(req.body).success(function (exhibit) {
    db['Exhibit'].findAll().success(function (exhibits) {
      req.dataProcessed = exhibits;
      viewExhibits(req, res);
    });
  });
});

function viewExhibits (req, res) {
  var context = req.dataProcessed;
  res.render('exhibit/view-exhibits', { Exhibits: context, user: req.session.username });
}

router.put('/:id', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].find({ where: { id: req.params.id }}).success(function (exhibit) {
    exhibit.updateAttributes(req.body).success(function (exhibit) {
      db['Exhibit'].findAll().success(function (exhibits) {
        req.dataProcessed = exhibits;
        viewExhibits(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].find({ where: { id: req.params.id }}).success(function (exhibit) {
    exhibit.destroy().success(function () {
      res.send(200);
      viewExhibits(req, res);
    });
  });
});