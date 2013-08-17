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
            console.log(_DEBUG + "Modules:", result); //DEBUG
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
            res.redirect('/app/modules');
        }
    });
}

exports.readIt = function(req, res) {
    Module.readIt(req.params.objectId, function(err, module) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            Fnction.loadAll(function(err, functions) {
                if (err) console.log(_DEBUG + "ERROR:", functions); //DEBUG
                else {
                    res.render('modules/show', {
                        title: "Módulo " + module._id,
                        module: module,
                        functions: functions
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
    Module.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/modules');
        }
    });
}

exports.deleteIt = function(req, res) {
    var id = req.body.id;
    var modifiedBy = req.user._id;
    Module.deleteIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/modules');
        }
    });
}

/* ===================
    Custom
   =================== */