var express = require('express');

module.exports = (dbs) => {
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  return router;
}

