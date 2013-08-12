/* ===================
    Controllers
   =================== */

var userController = require('../app/controllers/userController');
var profileController = require('../app/controllers/profileController');
var appController = require('../app/controllers/appController');
var moduleController = require('../app/controllers/moduleController');
var functionController = require('../app/controllers/functionController');

var exampleController = require('../app/controllers/exampleController');
var passport = require('passport');

/* ===================
    Middlewares
   =================== */
   
var auth = require('./middlewares/authorization');

/* ===================
    Utils
   =================== */

var passportExampleOptions = {
  successRedirect: '/admin',
  failureRedirect: '/admin/login'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

    //Usuarios
    app.get('/users', userController.index);
    app.get('/users/new', userController.new);
    app.get('/users/:objectId', userController.readIt);
    app.post('/users/create', userController.createIt);
    app.post('/users/update', userController.updateIt);
    app.post('/users/delete', userController.deleteIt);

    //Profiles
    app.get('/profiles', profileController.index);
    app.get('/profiles/new', profileController.new);
    app.get('/profiles/:objectId', profileController.readIt);
    app.post('/profiles/create', profileController.createIt);
    app.post('/profiles/update', profileController.updateIt);
    app.post('/profiles/delete', profileController.deleteIt);

    //Apps
    app.get('/apps', appController.index);
    app.get('/apps/new', appController.new);
    app.get('/apps/:objectId', appController.readIt);
    app.post('/apps/create', appController.createIt);
    app.post('/apps/update', appController.updateIt);
    app.post('/apps/delete', appController.deleteIt);

    //Modules
    app.get('/modules', moduleController.index);
    app.get('/modules/new', moduleController.new);
    app.get('/modules/:objectId', moduleController.readIt);
    app.post('/modules/create', moduleController.createIt);
    app.post('/modules/update', moduleController.updateIt);
    app.post('/modules/delete', moduleController.deleteIt);

    //Functions
    app.get('/functions', functionController.index)      
    app.get('/functions/new', functionController.new);
    app.get('/functions/:objectId', functionController.readIt);
    app.post('/functions/create', functionController.createIt);
    app.post('/functions/update', functionController.updateIt);
    app.post('/functions/delete', functionController.deleteIt);


    // Example
    app.get('/', exampleController.exampleFunction);
    app.get('/:exampleId', exampleController.show);
    app.get('/success', auth.requiresLogin, exampleController.exampleFunction);
    app.post('/certificate', exampleController.certificate);
    app.post('/success', exampleController.success);
    app.post('/auth/login', passport.authenticate('local', passportExampleOptions));
}