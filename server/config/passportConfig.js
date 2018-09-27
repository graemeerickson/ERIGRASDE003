require('dotenv').config(); // loads the .env
const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

const BACKEND_URL = 'http://localhost:3001';
const AUTH_CALLBACK_PATH = '/auth/callback';

passport.use(new GoodreadsStrategy({
    consumerKey: process.env.GOODREADS_KEY,
    consumerSecret: process.env.GOODREADS_SECRET,
    callbackURL: BACKEND_URL + AUTH_CALLBACK_PATH
  },

  function(token, tokenSecret, profile, done) {
    // asynchronous verification
    process.nextTick(function () {
      
      // To keep the example simple, the user's Goodreads profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Goodreads account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;