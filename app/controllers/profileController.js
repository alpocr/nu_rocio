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
            res.redirect('/profiles');
        }
    });
}

exports.readIt = function(req, res) {    
    Profile.readIt(req.params.objectId, function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('profiles/show', {
                title: "Perfil "+ result._id,
                profile: result
            });
        }
    });
}

exports.updateIt = function(req, res) {
    var object = req.body;
    var id = req.body.id;
    var modifiedBy = null; /* TODO: Temp fix */
    Profile.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/profiles');
        }
    });
}

exports.deleteIt = function(req, res) {
    Profile.deleteIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/profiles');
        }
    });
}

/* ===================
    Custom
   =================== */