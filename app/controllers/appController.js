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
            res.redirect('/apps');
        }
    });
}

exports.readIt = function(req, res) {    
    App.readIt(req.params.objectId, function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('apps/show', {
                title: "App "+ result._id,
                app: result
            });
        }
    });
}

exports.updateIt = function(req, res) {
    var object = req.body;
    var id = req.body.id;
    var modifiedBy = null; /* TODO: Temp fix */
    App.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/apps');
        }
    });
}

exports.deleteIt = function(req, res) {
    App.deleteIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/apps');
        }
    });
}

/* ===================
    Custom
   =================== */