var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //Added by Carlos for session

var routes = require('./routes/index');
var report = require('./routes/report_route');//Added by Carlos
var customer = require('./routes/customer_route');//Added by Carlos
var dataEntry = require('./routes/data_entry_route');//Added by Carlos
var admin = require('./routes/admin_route');//Added by Carlos

var app = express();

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
app.use(session({secret: 'lab11'})); //Added by carlos for Session

app.use('/', routes);

function restrict(req, res, next){
    if(req.session.account) { //check if user is authenticated yet
        next();  //user logged in so proceed to requested page
    }
    else {
        req.session.originalUrl = req.originalUrl;
        res.redirect('/login');  // they aren't so ask them to login
    }
}

app.use('/login', routes);//Added by Carlos
app.use('/about', routes);//Added by Carlos
app.use('/report', restrict, report);//Added by Carlos
app.use('/admin', restrict, admin);//Added by Carlos
app.use('/dataEntry', restrict, dataEntry);//Added by Carlos
app.use('/customer', restrict, customer);//Added by Carlos

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
// no stacktraces leaked to reports
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
