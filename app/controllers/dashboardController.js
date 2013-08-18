/* ===================
    Variables
   =================== */

// Main dependecies

var Profile = _MONGOOSE.model('Profile');
var App = _MONGOOSE.model('App');
var Module = _MONGOOSE.model('Module');
var Fnction = _MONGOOSE.model('Function');

/* ===================
    Custom
   =================== */

// Index
exports.index = function(req, res) {
    Profile.readIt(req.user.profile, function(err, profile) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            App.loadFromArray(profile.apps, function(err, apps) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    console.log(_DEBUG + "Res:", apps[0].name); //DEBUG
                    res.render('dashboard/index', {
                        title: "Dashboard de " + req.user.name + " " + req.user.lastname,
                        apps: apps,
                        profile: req.user.profile.name
                    });
                }
            });
        }
    });
};

exports.showApp = function(req, res) {

    App.readByPath(req.params.appPath, function(err, app) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            Module.loadFromArray(app.modules, function(err, modules) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    res.render('dashboard/app', {
                        title: "Dashboard de " + req.user.name + " " + req.user.lastname,
                        app: app,
                        modules: modules
                    });
                }
            });
        }
    });
}

exports.showFunction = function(req, res) {

    App.readByPath(req.params.appPath, function(err, app) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            Fnction.readByPath(req.params.functionPath, function(err, fnction) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    res.render('dashboard/function', {
                        title: "Dashboard de " + req.user.name + " " + req.user.lastname,
                        app: app,
                        fnction: fnction
                    });
                }
            });
        }
    });
}