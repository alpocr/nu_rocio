/* ===================
    Variables
   =================== */

// Main dependecies

var Profile = _MONGOOSE.model('Profile');
var App = _MONGOOSE.model('App');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    Profile.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('profiles/index', {
                title: "Perfiles",
                profiles: result
            });
        }
    });
};

exports.new = function(req, res) {
    App.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('profiles/new', {
                title: "Perfil",
                apps: result
            });
        }
    });
};

exports.createIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG

    var profile = new Profile(req.body);
    profile.createIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/profiles');
        }
    });
}

exports.readIt = function(req, res) {
    Profile.readIt(req.params.objectId, function(err, profile) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            App.loadAll(function(err, apps) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    res.render('profiles/show', {
                        title: "Perfil: " + profile.name,
                        profile: profile,
                        apps: apps
                    });
                }
            });
        }
    });
}

exports.updateIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG
    var object = req.body;
    var id = req.body.id;
    var modifiedBy = req.user._id;
    Profile.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/profiles');
        }
    });
}

exports.deleteIt = function(req, res) {
    var id = req.body.id;
    var modifiedBy = req.user._id;
    Profile.deleteIt(id, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/profiles');
        }
    });
}

/* ===================
    Custom
   =================== */