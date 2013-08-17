/* ===================
    Variables
   =================== */

// Main dependecies

var User = _MONGOOSE.model('User');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
    res.render('home/index', {

    });
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

/* ===================
    Custom
   =================== */