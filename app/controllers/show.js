var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/show', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}


router.get('/add', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].findAll().success(function (exhibits) {
    res.render('show/add-show', {user: req.session.username, exhibits: exhibits});
  });
});

router.get('/:id', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Exhibit'].findAll().success(function (exhibits) {
    db['Show'].find({ where: { id: req.params.id }}).success(function (show) {
      res.render('show/view-show', { show: show, user: req.session.username, exhibits: exhibits });
    });
  });
});

router.get('/', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Show'].findAll({ order: 'id ASC' }).success(function (Shows) {
    res.render('show/view-shows', { Shows: Shows, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  if (!authenticate(req)) return res.redirect('/authentication/login');
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
  if (!authenticate(req)) return res.redirect('/authentication/login');
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
  if (!authenticate(req)) return res.redirect('/authentication/login');
  db['Show'].find({ where: { id: req.params.id }}).success(function (show) {
    show.destroy().success(function () {
      res.send(200);
      viewShows(req, res);
    });
  });
});