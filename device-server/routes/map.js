var express = require('express');

// Use dependency injection to pass in database connections as dbs
module.exports = (dbs) => {
  var router = express.Router();
  var locationsDB = dbs.DeviceServer.db('DeviceServer'); //  using the DeviceServer database

  Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });

  /* GET listing of locations for specific device (by uuid) */
  router.get('/:nlocations?', (req, res) => {
      var nlocations;
      if (req.query.nlocations) {
          nlocations = req.query.nlocations;
      }
      else {
          nlocations = 1;
      }
      res.render("map", {nlocations: nlocations});
  });

  return router;
}
