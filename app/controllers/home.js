var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}

router.get('/', function (req, res, next) {
	if (!authenticate(req)) return res.redirect('/authentication/login');
  res.render('index', {});
});