var express = require('express'),
    router = express.Router(),
    db = require('../models'),
    moment = require('moment');

module.exports = function (app) {
  app.use('/zoo', router);
};

router.get('/add', function (req, res, next) {
  if (req.session.username) {
    var username = req.session.username;
  }
	res.render('zoo/add-zoo', { user: username, user: req.session.username });
});

router.get('/:id', function (req, res, next) {
  var timeslots = [{ time: '00:00:00', opening: false, closing: false },
                   { time: '01:00:00', opening: false, closing: false },
                   { time: '02:00:00', opening: false, closing: false },
                   { time: '03:00:00', opening: false, closing: false },
                   { time: '04:00:00', opening: false, closing: false },
                   { time: '05:00:00', opening: false, closing: false },
                   { time: '06:00:00', opening: false, closing: false },
                   { time: '07:00:00', opening: false, closing: false },
                   { time: '08:00:00', opening: false, closing: false },
                   { time: '09:00:00', opening: false, closing: false },
                   { time: '10:00:00', opening: false, closing: false },
                   { time: '11:00:00', opening: false, closing: false },
                   { time: '12:00:00', opening: false, closing: false },
                   { time: '13:00:00', opening: false, closing: false },
                   { time: '14:00:00', opening: false, closing: false },
                   { time: '15:00:00', opening: false, closing: false },
                   { time: '16:00:00', opening: false, closing: false },
                   { time: '17:00:00', opening: false, closing: false },
                   { time: '18:00:00', opening: false, closing: false },
                   { time: '19:00:00', opening: false, closing: false },
                   { time: '20:00:00', opening: false, closing: false },
                   { time: '21:00:00', opening: false, closing: false },
                   { time: '22:00:00', opening: false, closing: false },
                   { time: '23:00:00', opening: false, closing: false }];
  for (var k = 0, len = timeslots.length; k < len; k++) {
    timeslots[k].formatted = moment(timeslots[k].time, 'HH:mm:ss').format('hh:mm A');
  }
  console.log(timeslots);

  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoo) {
    for (var i = 0, len = timeslots.length; i < len; i++) {
      if (zoo.opening_time == timeslots[i].time) {
        timeslots[i].opening_time = true;
        break;
      }
    }

    for (var j = 0, len = timeslots.length; j < len; j++) {
      if (zoo.closing_time == timeslots[j].time) {
        timeslots[j].closing_time = true;
        break;
      }
    }

    res.render('zoo/view-zoo', { zoo: zoo, user: req.session.username, timeslots: timeslots });
  });
});

router.get('/', function (req, res, next) {
  db['Zoo'].findAll({ order: 'id ASC' }).success(function (Zoos) {
  for (var i = 0, len = Zoos.length; i < len; i++) {
    Zoos[i].opening_time = moment(Zoos[i].opening_time, 'HH:mm:ss').format('hh:mm A');
    Zoos[i].closing_time = moment(Zoos[i].closing_time, 'HH:mm:ss').format('hh:mm A');
  }
  res.render('zoo/view-zoos', { Zoos: Zoos, user: req.session.username });
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  db['Zoo'].create(req.body).success(function (zoo) {
    db['Zoo'].findAll().success(function (zoos) {
      req.dataProcessed = zoos;
      viewZoos(req, res);
    });
  });
});

function viewZoos (req, res) {
  var context = req.dataProcessed;
  res.render('zoo/view-zoos', { Zoos: context });
}

router.put('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoo) {
    zoo.updateAttributes(req.body).success(function (zoos) {
      db['Zoo'].findAll().success(function (zoos) {
        req.dataProcessed = zoos;
        viewZoos(req, res);
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  db['Zoo'].find({ where: { id: req.params.id }}).success(function (zoos) {
    zoos.destroy().success(function () {
      res.send(200);
      viewZoos(req, res);
    });
  });
});