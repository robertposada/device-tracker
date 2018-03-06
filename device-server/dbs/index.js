var async = require('async');
var MongoClient = require('mongodb').MongoClient;

// Connection url to database
const url = 'mongodb://localhost:27017/DeviceServer';

// Apply returns a partially applied function
// We use the connect method to connect to mongodb servers
var databases = {
    DeviceServer: async.apply(MongoClient.connect, url)
}

// Runs the given callback on each instance in databases
module.exports = (callback) => {
    async.parallel(databases, callback)
}