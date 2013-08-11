/* ===================
    Dependencies
   =================== */

var LocalStrategy = require('passport-local').Strategy

module.exports = function(passport, config) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        //The following method is an example of what you should do
        //with your own db models

        /*YourUserModel.yourCustomizedFindById(id, function(err, user) {
            done(err, user);
        });*/
    });

    passport.use(new LocalStrategy(
        function(_username, _password, done) {
            //The following method is an example of what you should do
            //with your own db models

            /*YourUserModel.yourCustomizedFindOne({
                username: _username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(_password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });*/
        }
    ));
}