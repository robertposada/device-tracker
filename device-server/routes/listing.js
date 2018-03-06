var express = require('express');

// Use dependency injection to pass in database connections as dbs
module.exports = (dbs) => {
  var router = express.Router();
  var locationsDB = dbs.DeviceServer.db('DeviceServer'); //  using the DeviceServer database



  /* GET listing of locations for specific device (by uuid) */
  router.get('/:uuid?/:start?/:nlocations?', (req, res) => {
    var uuid = req.uuid; // id of the raspberry pi
    
    if (uuid == undefined) { uuid = req.query.uuid;}
    var start = parseInt(req.query.start); // corresponds to how recent the first location will be
    var nlocations = parseInt(req.query.nlocations); // number of locations to return

    if (start == undefined || !start) {start = 0;}
    if (nlocations == undefined || !nlocations) {nlocations = 5;}

    let query = {
      uuid: uuid
    };

    // Sort the locations by their times (should be in milliseconds since epoch)
    // retreives data in order from most recent time to oldest
    locationsDB.collection('Locations').find(query).sort({"date_time" : -1}).toArray((err, result) => {
      if (err) {
        res.status(500).end("Error in the server");
      }

      if (result) {
        console.log("NumLocations - " + nlocations)
        console.log("Start - " + start)
        console.log(result);
        result = result.slice(start, start + nlocations);
        console.log(result);
        res.render('locations', {locations: result, uuid: uuid, nlocations: nlocations, start: start});
      }
    });


  });

  return router;
}
