var express = require('express');

module.exports = (dbs) => {
    var router = express.Router();
    var locationsDB = dbs.DeviceServer.db('DeviceServer'); // using DeviceServer database

    // handles get requests sent by our map page
    router.get('/:uuid/:nlocations/:time', (req, res) => {
        console.log("Got request from map page...");

        const uuid = req.params.uuid;
        var nlocations = parseInt(req.params.nlocations);
        var trackFrom = req.params.time; 
        console.log("Date to track from... " + trackFrom);
        let query = {
            uuid: uuid,
            date_time: {$lt : parseInt(trackFrom)},
        };

        // Use mongo to retreive results, sorted and limit the results to number of requested locations
        // sorted in decreasing time (most recent to oldest)
        console.log("Numlocations - " + nlocations);
        locationsDB.collection('Locations').find(query).sort({"date_time" : -1}).limit(nlocations).toArray((err, result) => {
            console.log("Returned from database...");
            if (err) {
                res.render('error', {message: "Oops! Something went wrong"});
            }
            else {
                if (result) {
                    // make json object with locations and send
                    let locations_json =  {
                        locations: result
                    }              
                    console.log(locations_json);
                    res.status(200).json(locations_json); 
                } else {
                    res.status(404).json();
                }
            }
        });
    });

    // Handles post requests from raspberry pi
    router.post('/:uuid', (req, res) => {
        console.log("Got Request from raspi...");
        if (req.body.uuid != req.params.uuid) {
            res.status(400).end("Bad Request");
        }
        
        let query = {
            uuid: req.body.uuid, // uuid of raspi
            date_time: parseInt(req.body.date_time), // milliseconds from epoch
            latitude: parseFloat(req.body.latitude), // in decimal degrees
            longitude: parseFloat(req.body.longitude), // in decimal degrees
            altitude: parseFloat(req.body.altitude), // in meters
            speed: parseFloat(req.body.speed), // in kilometers/hour
            direction: parseFloat(req.body.direction) // in degrees
        };

        // Inserting new document in Locations collection
        locationsDB.collection('Locations').insertOne(query, (err, result) => {
            if (err) {
                res.status(500).send("Error in server - Failed to insert location into database");
            } else {
                res.status(201).send();
            }
        });
    });

    return router;
}