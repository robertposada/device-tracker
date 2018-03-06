var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var map = require('./routes/map');
var login = require('./routes/login');
var listing = require('./routes/listing');
var initializeDatabases = require('./dbs');

var app = express();

/*  
 *  First we intialize the locations database before 
 *  setting up the rest of the express app
 *  dbs is an object with mongodb clients - (keys: DBNames, value: MongoClient)
 *  We pass dbs into our routes to utilize database connection pooling
 */

initializeDatabases((err, dbs) => {
  if (err) {
    console.log("ERROR: Failed to make all database connections");
    process.exit(1);
  }
  console.log("Succesfully conected to databases");

  // Initialize the application once database connection is established
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Perform authentication and sanity checks of raspi post requests
  app.post('/api/:uuid', (req, res, next) => {
    // simply check if all required fields are present
    // TODO: Maybe more checks here on the values...
    if (!req.body.uuid || !req.body.date_time || !req.body.longitude || !req.body.latitude || 
        !req.body.altitude || !req.body.speed || !req.body.direction) {
          res.status(400).end("Bad Request");
    } else {
      // all sanity checks passed - continue on to routing
      next();
    }
  });

  app.all('*', (req, res, next) => {
    if (req.path.indexOf('/listing') == 0 || req.path.indexOf('/map') == 0) {
      // Check if cookie has uuid
      var cookie = req.cookies.jwt;
      // check if cookie is in header
      if (cookie == undefined) {
        res.status(401);
        res.render("login", {message: "Please Login to use Tracker"});
      } else {
        var secret = "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
        jsonwebtoken.verify(cookie, secret, (err, decoded) => {
          if (err) {
            res.redirect("/login", {message:"Please Login Again to use Tracker" });
          } else {
            // check exiration and username in cookie
            let time = Math.floor(Date.now() / 1000); // time in seconds
            if (time > decoded.exp) {
              res.status(401);
              res.render("login", {message: "Please Login Again to use Tracker"});
            } else {
              req.uuid = decoded.uuid;
              next();
            }
          }
        });
      }
    } else {
      next();
    }
  });

  // Use routes
  app.use('/', index(dbs));
  app.use('/users', users(dbs));
  app.use('/listing', listing(dbs));
  app.use('/login', login(dbs));
  app.use('/map', map(dbs));
  app.use('/api', api(dbs));
  
  
  

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});



module.exports = app;
