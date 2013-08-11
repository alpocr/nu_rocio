/* ===================
    Variables
   =================== */

// Main dependecies

var ExampleModel = _MONGOOSE.model('ExampleModel');

/* ===================
    Main
   =================== */

// Index
exports.exampleFunction = function(req, res) {
    res.render('exampleView/index', {
        title: "Example View",
    });
};

//Create
exports.create = function(req, res) {
    var exampleModel = new ExampleModel(req.body)

    exampleModel.uploadAndSave(function(err) {
        if (!err) {
            res.json({
                exampleId: exampleModel._id
            })
        } else {
            res.json({
                errors: err
            })
        }
    })
}

//Show
exports.show = function(req, res) {
    res.json(req.example);
}

/* ===================
    Middlewares
   =================== */

//Load
exports.load = function(req, res, next, id) {
    ExampleModel.load(id, function(err, result) {
        if (err) return next(err);
        if (!result) return next(new Error('not found'));
        req.example = result;
        next();
    })
}