/* ===================
    Generic require login routing middleware
   =================== */

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/')
    }
    next()
}

exports.requiresAdminLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/admin/login')
    }
    next()
}