var Profile = _MONGOOSE.model('Profile');
var App = _MONGOOSE.model('App');

/* ===================
    Generic require login routing middleware
   =================== */

exports.requiresLogin = function(req, res, next) {
    //Valida si el usuario está logueado
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/')
    }

    // Valida si el usuario logueado, tiene derechos sobre la ruta actual
    var mainPath = req.originalUrl.split("/dashboard")[1];
    if (mainPath != undefined && mainPath != "") {
        currentPath = mainPath.split("/")[1];
        console.log(_DEBUG + "URL:", currentPath); //DEBUG

        Profile.readIt(req.user.profile, function(err, profile) {
            if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
            else {
                App.loadFromArrayByPath(profile.apps, currentPath, function(err, app) {
                    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG

                    if (!app) {
                        console.log(_DEBUG + "No tiene permisos para este app"); //DEBUG
                        req.session.returnTo = req.originalUrl
                        return res.redirect('/dashboard');
                    }

                    console.log(_DEBUG + "Permisos de ruta válidos"); //DEBUG
                    next()
                });
            }
        });
    } else {
        /* TODO: Creo que hay un tema de async callbacks acá */
        console.log(_DEBUG + "Permisos normal válido"); //DEBUG
        next()
    }
}

exports.requiresAdmin = function(req, res, next) {
    //Valida si el usuario está logueado
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/')
    }

    console.log(_DEBUG + "User:", req.user); //DEBUG
    if (req.user.profile.name != "Admin") {
        req.session.returnTo = req.originalUrl
        return res.redirect('/')
    }

    // Valida si el usuario logueado, tiene derechos sobre la ruta actual
    var mainPath = req.originalUrl.split("/dashboard")[1];
    if (mainPath != undefined && mainPath != "") {
        currentPath = mainPath.split("/")[1];
        console.log(_DEBUG + "URL:", currentPath); //DEBUG

        Profile.readIt(req.user.profile, function(err, profile) {
            if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
            else {
                App.loadFromArrayByPath(profile.apps, currentPath, function(err, app) {
                    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG

                    if (!app) {
                        console.log(_DEBUG + "No tiene permisos para este app"); //DEBUG
                        req.session.returnTo = req.originalUrl
                        return res.redirect('/dashboard');
                    }

                    console.log(_DEBUG + "Permisos de ruta válidos"); //DEBUG
                });
            }
        });
    }

    /* TODO: Creo que hay un tema de async callbacks acá */
    console.log(_DEBUG + "Permisos normal válido"); //DEBUG
    next()
}