/* ===================
    Variables
   =================== */

// Globals
_MONGOOSE = require('mongoose');
_DEBUG = "\033[31m \033[1m";
env = process.env.NODE_ENV || 'staging';

// Main dependecies
var config = require('./config/config')[env];
var express = require('express');
var passport = require('passport');
var fs = require('fs');

/* ===================
    Mongoose
   =================== */

_MONGOOSE.connect(config.db);
//Models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

/* ===================
    Passport
   =================== */
require('./config/passport')(passport, config)

/* ===================
    Main
   =================== */

// Configure the app
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'thebigsecret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Utils
app.locals._ = require('underscore');
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(_DEBUG + "Listening on " + port);
});

/* ===================
    Routes
   =================== */

require('./config/routes')(app);
app.use(express.static(__dirname + '/public'));