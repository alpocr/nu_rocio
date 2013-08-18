/* ===================
    Dependencies
   =================== */

var LocalStrategy = require('passport-local').Strategy
// var FirmaStrategy = require('passport-local').Strategy
var User = _MONGOOSE.model('User');

module.exports = function(passport, config) {

    passport.serializeUser(function(user, done) {
        //console.log(_DEBUG + "SERIALIZING USER..."); //DEBUG
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        //console.log(_DEBUG + "DESERIALIZING USER..."); //DEBUG
        User.findById(id, function(err, user) {
            // console.log(_DEBUG + "CONNECTED USER: ", user); //DEBUG
            done(err, user);
        }).populate("profile", "name")
    });

    console.log(_DEBUG + "AUTHENTICATING..."); //DEBUG

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            User.findOne({
                username: username,
                password: password
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    if (_DEBUG) console.log("Email incorrecto"); //DEBUG
                    return done(null, false, {
                        message: 'Email incorrecto.'
                    });
                }
                if (!user.validPassword(password)) { /* TODO: Método de modelo */
                    if (_DEBUG) console.log("Password incorrecto"); //DEBUG
                    return done(null, false, {
                        message: 'Password incorrecto.'
                    });
                }
                if (_DEBUG) console.log("Usuario autenticado"); //DEBUG
                return done(null, user);
            });
        }
    ));

    /*    passport.use(new LocalStrategy({
            usernameField: 'firma'
        },
        function(username, password, done) {
            console.log(_DEBUG + "AUTHENTICATING FIRMA..."); //DEBUG
            if (username != "N/A") {

                User.findOne({
                    firma: username
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        if (_DEBUG) console.log("Firma inválida"); //DEBUG
                        return done(null, false, {
                            message: 'Firma inválida.'
                        });
                    }
                    if (_DEBUG) console.log("Usuario autenticado"); //DEBUG
                    return done(null, user);
                });
            }
        }
    ));*/
}