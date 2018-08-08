var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var category = require('./routes/Category');
var product = require('./routes/Product');
var config = require('./config/Config');
var basicAuth = require('basic-auth');
var app = express();
app.use(session({ secret: 'rest-api', cookie: { maxAge: 60000 }}))
app.use(function(req, res, next) {
    global.uniqueId = req.session.id;
    next();
})
global.logger = require('./utils/logger');
let db_url = 'mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.database;
let mongoDB = db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Middleware for basic authorization
 */
app.use(function(req, res, next) {
    var user = basicAuth(req);
    //if(!user || !user.name || !user.pass) {
    if(user.name === 'suhas' && user.pass === 'heady@123') {
        next();
    } else {
        res.status(401);
        res.send({error: 'Unauthorized access'});
    }
});

/**
 * Routers start
 */
app.use('/category', category);
app.use('/product', product);

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
  res.send({error: 'URL not found'});
});

module.exports = app;
