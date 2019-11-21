const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var mongoose=require("mongoose");

var User=mongoose.model('users');
var Planner=mongoose.model('planners');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}, function(err, user) {
        done(err, user);
    });
});

// local strategy // 3
passport.use("local-login",
    new LocalStrategy({
            useridField : "id", // 3-1
            passwordField : "pw", // 3-1
            passReqToCallback : true
        },
        function(req, id, pw, done) { // 3-2
            User.findOne({id:id})
                .select({pw:1})
                .exec(function(err, user) {
                    if (err) return done(err);

                    if (user && user.authenticate(pw)){ // 3-3
                        return done(null, user);
                    } else {
                        req.flash("id", id);
                        req.flash("errors", {login:"Incorrect id or password"});
                        return done(null, false);
                    }
                });
        }
    )
);
module.exports = passport;