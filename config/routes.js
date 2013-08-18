/* ===================
    Controllers
   =================== */

var homeController = require('../app/controllers/homeController');
var userController = require('../app/controllers/userController');
var profileController = require('../app/controllers/profileController');
var appController = require('../app/controllers/appController');
var moduleController = require('../app/controllers/moduleController');
var functionController = require('../app/controllers/functionController');

var dashboardController = require('../app/controllers/dashboardController');
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
    successRedirect: '/dashboard',
    failureRedirect: '/'
}

/* ===================
    Main
   =================== */

module.exports = function(app) {

    //Firma
    app.post('/auth/firma', homeController.certificate);

    //Login
    app.get('/', homeController.index);
    app.post('/auth/login', passport.authenticate('local', passportLocalOptions));
    app.get('/app/logout', homeController.logout);

    //Dashboard
    app.get('/dashboard', auth.requiresLogin, dashboardController.index);
    app.get('/dashboard/:appPath', auth.requiresLogin, dashboardController.showApp);
    app.get('/dashboard/:appPath/:functionPath', auth.requiresLogin, dashboardController.showFunction);

    //Usuarios
    app.get('/app/users', auth.requiresAdmin, userController.index);
    app.get('/app/users/new', auth.requiresAdmin, userController.new);
    app.get('/app/users/:objectId', auth.requiresAdmin, userController.readIt);
    app.post('/app/users/create', auth.requiresAdmin, userController.createIt);
    app.post('/app/users/update', auth.requiresAdmin, userController.updateIt);
    app.post('/app/users/delete', auth.requiresAdmin, userController.deleteIt);

    //Profiles
    app.get('/app/profiles', auth.requiresAdmin, profileController.index);
    app.get('/app/profiles/new', auth.requiresAdmin, profileController.new);
    app.get('/app/profiles/:objectId', auth.requiresAdmin, profileController.readIt);
    app.post('/app/profiles/create', auth.requiresAdmin, profileController.createIt);
    app.post('/app/profiles/update', auth.requiresAdmin, profileController.updateIt);
    app.post('/app/profiles/delete', auth.requiresAdmin, profileController.deleteIt);

    //Apps
    app.get('/app/apps', auth.requiresAdmin, appController.index);
    app.get('/app/apps/new', auth.requiresAdmin, appController.new);
    app.get('/app/apps/:objectId', auth.requiresAdmin, appController.readIt);
    app.post('/app/apps/create', auth.requiresAdmin, appController.createIt);
    app.post('/app/apps/update', auth.requiresAdmin, appController.updateIt);
    app.post('/app/apps/delete', auth.requiresAdmin, appController.deleteIt);

    //Modules
    app.get('/app/modules', auth.requiresAdmin, moduleController.index);
    app.get('/app/modules/new', auth.requiresAdmin, moduleController.new);
    app.get('/app/modules/:objectId', auth.requiresAdmin, moduleController.readIt);
    app.post('/app/modules/create', auth.requiresAdmin, moduleController.createIt);
    app.post('/app/modules/update', auth.requiresAdmin, moduleController.updateIt);
    app.post('/app/modules/delete', auth.requiresAdmin, moduleController.deleteIt);

    //Functions
    app.get('/app/functions', auth.requiresAdmin, functionController.index)
    app.get('/app/functions/new', auth.requiresAdmin, functionController.new);
    app.get('/app/functions/:objectId', auth.requiresAdmin, functionController.readIt);
    app.post('/app/functions/create', auth.requiresAdmin, functionController.createIt);
    app.post('/app/functions/update', auth.requiresAdmin, functionController.updateIt);
    app.post('/app/functions/delete', auth.requiresAdmin, functionController.deleteIt);


    // Example
    /*    app.get('/', exampleController.exampleFunction);
    app.get('/:exampleId', exampleController.show);
    app.get('/success', auth.requiresLogin, exampleController.exampleFunction);
    app.post('/certificate', exampleController.certificate);
    app.post('/success', exampleController.success);
    app.post('/auth/login', passport.authenticate('local', passportExampleOptions));*/
}