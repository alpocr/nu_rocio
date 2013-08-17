/* ===================
    Controllers
   =================== */

var homeController = require('../app/controllers/homeController');
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

var passportLocalOptions = {
    successRedirect: '/app/users',
    failureRedirect: '/'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

    //Login
    app.get('/', homeController.index);
    app.post('/auth/login', passport.authenticate('local', passportLocalOptions));
    app.get('/app/logout', homeController.logout);

    //Usuarios
    app.get('/app/users', auth.requiresLogin, userController.index);
    app.get('/app/users/new', auth.requiresLogin, userController.new);
    app.get('/app/users/:objectId', auth.requiresLogin, userController.readIt);
    app.post('/app/users/create', auth.requiresLogin, userController.createIt);
    app.post('/app/users/update', auth.requiresLogin, userController.updateIt);
    app.post('/app/users/delete', auth.requiresLogin, userController.deleteIt);

    //Profiles
    app.get('/app/profiles', auth.requiresLogin, profileController.index);
    app.get('/app/profiles/new', auth.requiresLogin, profileController.new);
    app.get('/app/profiles/:objectId', auth.requiresLogin, profileController.readIt);
    app.post('/app/profiles/create', auth.requiresLogin, profileController.createIt);
    app.post('/app/profiles/update', auth.requiresLogin, profileController.updateIt);
    app.post('/app/profiles/delete', auth.requiresLogin, profileController.deleteIt);

    //Apps
    app.get('/app/apps', auth.requiresLogin, appController.index);
    app.get('/app/apps/new', auth.requiresLogin, appController.new);
    app.get('/app/apps/:objectId', auth.requiresLogin, appController.readIt);
    app.post('/app/apps/create', auth.requiresLogin, appController.createIt);
    app.post('/app/apps/update', auth.requiresLogin, appController.updateIt);
    app.post('/app/apps/delete', auth.requiresLogin, appController.deleteIt);

    //Modules
    app.get('/app/modules', auth.requiresLogin, moduleController.index);
    app.get('/app/modules/new', auth.requiresLogin, moduleController.new);
    app.get('/app/modules/:objectId', auth.requiresLogin, moduleController.readIt);
    app.post('/app/modules/create', auth.requiresLogin, moduleController.createIt);
    app.post('/app/modules/update', auth.requiresLogin, moduleController.updateIt);
    app.post('/app/modules/delete', auth.requiresLogin, moduleController.deleteIt);

    //Functions
    app.get('/app/functions', auth.requiresLogin, functionController.index)
    app.get('/app/functions/new', auth.requiresLogin, functionController.new);
    app.get('/app/functions/:objectId', auth.requiresLogin, functionController.readIt);
    app.post('/app/functions/create', auth.requiresLogin, functionController.createIt);
    app.post('/app/functions/update', auth.requiresLogin, functionController.updateIt);
    app.post('/app/functions/delete', auth.requiresLogin, functionController.deleteIt);


    // Example
    /*    app.get('/', exampleController.exampleFunction);
    app.get('/:exampleId', exampleController.show);
    app.get('/success', auth.requiresLogin, exampleController.exampleFunction);
    app.post('/certificate', exampleController.certificate);
    app.post('/success', exampleController.success);
    app.post('/auth/login', passport.authenticate('local', passportExampleOptions));*/
}