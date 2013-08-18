/* ===================
    Variables
   =================== */

// Main dependecies

var App = _MONGOOSE.model('App');
var Module = _MONGOOSE.model('Module');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    App.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('apps/index', {
                title: "Apps",
                apps: result
            });
        }
    });
};

exports.new = function(req, res) {
    Module.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('apps/new', {
                title: "App",
                modules: result
            });
        }
    });
};

exports.createIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG

    var app = new App(req.body);
    app.createIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/apps');
        }
    });
}

exports.readIt = function(req, res) {
    App.readIt(req.params.objectId, function(err, app) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            Module.loadAll(function(err, modules) {
                if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
                else {
                    res.render('apps/show', {
                        title: "App: " + app.name,
                        app: app,
                        modules: modules
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
    App.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/apps');
        }
    });
}

exports.deleteIt = function(req, res) {
    var id = req.body.id;
    var modifiedBy = req.user._id;
    App.deleteIt(id, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/apps');
        }
    });
}

/* ===================
    Custom
   =================== */