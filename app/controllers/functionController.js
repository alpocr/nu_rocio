/* ===================
    Variables
   =================== */

// Main dependecies

var Fnction = _MONGOOSE.model('Function');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    Fnction.loadAll(function(err, result) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('functions/index', {
                title: "Funciones",
                fnctions: result
            });
        }
    });
};

exports.new = function(req, res) {
    res.render('functions/new', {
        title: "Funciones"
    });
};

exports.createIt = function(req, res) {
    console.log(_DEBUG + "Req:", req.body); //DEBUG

    var fnction = new Fnction(req.body);
    fnction.createIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/functions');
        }
    });
}

exports.readIt = function(req, res) {
    Fnction.readIt(req.params.objectId, function(err, fnction) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.render('functions/show', {
                title: "Función: " + fnction.name,
                fnction: fnction
            });
        }
    });
}

exports.updateIt = function(req, res) {
    var object = req.body;
    var id = req.body.id;
    var modifiedBy = null; /* TODO: Temp fix */
    Fnction.updateIt(id, object, modifiedBy, function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/functions');
        }
    });
}

exports.deleteIt = function(req, res) {
    Fnction.deleteIt(function(err) {
        if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
        else {
            res.redirect('/app/functions');
        }
    });
}

/* ===================
    Custom
   =================== */