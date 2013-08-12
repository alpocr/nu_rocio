/* ===================
    Variables
   =================== */

// Main dependecies

var Module = _MONGOOSE.model('Module');
var Fnction = _MONGOOSE.model('Function');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    Module.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('modules/index', {
                title: "Módulos",
                modules: result
            });
        }
    });
};

exports.new = function(req, res) {
    Fnction.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('modules/new', {
                title: "Módulo",
                functions: result
            });
        }
    });
};

exports.createIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG

    var module = new Module(req.body);
    module.createIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/modules');
        }
    });
}

exports.readIt = function(req, res) {    
    Module.readIt(req.params.objectId, function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('modules/show', {
                title: "Módulo "+ result._id,
                module: result
            });
        }
    });
}

exports.updateIt = function(req, res) {
    var object = req.body;
    var id = req.body.id;
    var modifiedBy = null; /* TODO: Temp fix */
    Module.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/modules');
        }
    });
}

exports.deleteIt = function(req, res) {
    Module.deleteIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/modules');
        }
    });
}

/* ===================
    Custom
   =================== */