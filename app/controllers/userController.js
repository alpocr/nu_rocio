/* ===================
    Variables
   =================== */

// Main dependecies

var User = _MONGOOSE.model('User');
var Profile = _MONGOOSE.model('Profile');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    User.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('users/index', {
                title: "Usuarios",
                users: result
            });
        }
    });
};

exports.auth = function(req, res) {

};

exports.new = function(req, res) {
    Profile.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('users/new', {
                title: "Usuarios",
                profiles: result
            });
        }
    });
};

exports.createIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG
    if (req.body.firma.trim() == "") req.body.firma = "N/A";

    var user = new User(req.body);
    user.createIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/users');
        }
    });
}

exports.readIt = function(req, res) {
    User.readIt(req.params.objectId, function(err, user) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {

            Profile.loadAll(function(err, profiles) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    res.render('users/show', {
                        title: "Usuario: " + user.name + " " + user.lastname,
                        user: user,
                        profiles: profiles
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
    if (req.body.firma.trim() == "") req.body.firma = "N/A";
    var modifiedBy = req.user._id;
    User.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/users');
        }
    });
}

exports.deleteIt = function(req, res) {
    var modifiedBy = req.user._id;
    User.deleteIt(id, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/users');
        }
    });
}

/* ===================
    Custom
   =================== */