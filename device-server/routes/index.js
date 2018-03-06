var express = require('express');

// Use dependency injection to pass in database connections as dbs
module.exports = (dbs) => {
  var router = express.Router();
  var locationsDB = dbs.DeviceServer.db('DeviceServer'); //  using the DeviceServer database
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Device Tracker - CEED SQUAD' });
  });

  return router;
}
