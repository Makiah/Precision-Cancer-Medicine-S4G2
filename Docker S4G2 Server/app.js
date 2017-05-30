'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fibers = require('./middleware/fiber')
var routes = require('./routes/index');
var users = require('./routes/users');
var fhir = require('./routes/fhir');
var session = require('express-session');
var api = require('./routes/api');
var auth = require('./routes/auth');
var appRouter = require('./routes/app');
var reverseProxy = require('./routes/reverse_proxy');
var dataUpload = require('./routes/data_upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(session({secret:'dontpanic', access_token:'s4gserver'}));
app.use(fibers);
app.use('/', routes);
app.use('/fhir', fhir);
app.use('/api/oauth', auth);
app.use('/account', users);
app.use('/app', appRouter);
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/api/fhir', reverseProxy);
app.use('/upload', dataUpload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
