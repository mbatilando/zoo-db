var express = require('express'),
    router = express.Router(),
    db = require('../models');

// function authenticate (req) {
//   if (!req.session.username || !req.session.user_type) {
//     return false;
//   }
//   return true;
// }

module.exports = function (app) {
  app.use('/admin/dashboard', router);
};

function authenticate (req) {
  if (!req.session.username || !req.session.user_type) {
    return false;
  }
  return true;
}

router.get('/', function (req, res, next) {
  // if (!authenticate(req)) return res.redirect('/authentication/login');
  res.render('admin-dashboard/dashboard', { user: req.session.username });
});