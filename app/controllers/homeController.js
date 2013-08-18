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

exports.certificate = function(req, res) {
    console.log("REQ: ", req.body);

    var cert = req.body.cert_request;

    /* TOOD: Capturar error */
    res.render('certificate/index', {
        title: "Certificado",
        nickname: "CN=Usuario,OU=Ingenieria de Software,O=Universidad Latina,C=CR",
        cert: cert
    });
};

/* ===================
    Custom
   =================== */