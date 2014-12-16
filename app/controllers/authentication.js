var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/authentication', router);
};

router.post('/login', function (req, res, next) {
  db['Users'].find({ where: { username: req.body.username }}).success(function (user) {
    if (user === null) {
      return res.render('authentication/login', { error: 'User does not exist' });
    }
    if (user.password === req.body.password) {
      req.session.username = user.username;
      req.session.user_type = user.user_type;
      if (req.session.user_type === 'admin') {
        return res.render('admin/search', { user: req.session.username, user: req.session.username });
      } else {
        return res.render('animal/search-animal-main', { user: req.session.username });
      }
    } else {
      return res.render('authentication/login', { error: 'Invalid Password/Username' });
    }
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  return res.redirect('/authentication/login');
});

router.get('/register', function (req, res, next) {
  res.render('authentication/register', {});
});


router.post('/register', function (req, res, next) {
  db['Users'].create(req.body).success(function (user) {
    req.session.username = user.username;
    req.session.user_type = user.user_type;
    res.render('authentication/register', { });
  })
});

router.get('/login', function (req, res, next) {
  res.render('authentication/login', { });
});