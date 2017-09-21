/*eslint-disable unknown-require */
require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var activity = require('./routes/activity');
var workout = require('./routes/workout');
var weighin = require('./routes/weigh-in');
var targetWO = require('./routes/targetWO');
var userapi = require('./routes/user');
var fitbitInfo = require('./routes/fitbit');
var tax = require('./routes/tax');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();
var client = new auth.OAuth2('190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com', '', '');

//app.use('/api/', jwtCheck);
app.use(function (req, res, next) {
    console.log('here');
    var token = req.get('Authorization');

    if (token) {
        token = token.slice(7);
        client.verifyIdToken(
            token,
            '190002128182-ei7n8eh95nourb0sdcoh2o12cindv9rp.apps.googleusercontent.com', function (err, login) {
                if (login) {
                    next();
                }
                else {
                    res.status(401).send('API Key is not valid');
                }
            })


    } else {
        res.status(401);
        res.send('API requires Google JWT');
    }

});
app.use('/api/activity', activity);
app.use('/api/workout', workout);
app.use('/api/weighin', weighin);
app.use('/api/targetWO', targetWO);
app.use('/api/user', userapi);
app.use('/api/fitbit', fitbitInfo);
app.use('/api/tax',tax);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
  // render the error page
  res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
