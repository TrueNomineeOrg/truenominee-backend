const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Use profile info to check if the user is registered in your DB
    done(null, profile);
  }
));

// Serialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
    done(err, user);
  // });
});
