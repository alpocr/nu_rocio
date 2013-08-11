/* ===================
    Controllers
   =================== */

var exampleController = require('../app/controllers/exampleController');
var passport = require('passport');

/* ===================
    Middlewares
   =================== */
var auth = require('./middlewares/authorization');

/* ===================
    Options
   =================== */

var passportExampleOptions = {
  successRedirect: '/admin',
  failureRedirect: '/admin/login'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

    // Home
    app.get('/', exampleController.exampleFunction);

    // Middleware

    //Gets

    app.get('/:exampleId', exampleController.show);
    app.get('/success', auth.requiresLogin, exampleController.exampleFunction);


    //Posts
    app.post('/create', exampleController.create);
    app.post('/auth/login', passport.authenticate('local', passportExampleOptions));
}