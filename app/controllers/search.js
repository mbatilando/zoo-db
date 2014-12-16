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
  app.use('/search', router);
};

router.get('/', function (req, res, next) {
  var entity = req.query.entity,
      attribute = req.query.attr,
      value = req.query.value;

  var query = {};
  query[attribute] = value;

  db[entity].findAll({ where: query }).success(function (result) {
    res.json(result);
  });
});