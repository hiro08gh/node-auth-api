const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = mongoose.model('Users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { 'email or password': 'is invalid' }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  ),
  new GoogleStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: ''
    },
    function(accessToken, refreshToken, profile, done) {
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);
