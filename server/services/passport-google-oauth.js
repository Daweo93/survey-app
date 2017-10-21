import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import config from '../config';

const User = mongoose.model('users');

// Serialize User with the user ID to generate identifying piece of information
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User with the user ID to get user data
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Setup passport strategy which use Passport Google OAuth20
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if this user with given ID is already created
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!existingUser) {
          // User doesn't exist, create it
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        } else {
          // User already exist
          done(null, existingUser);
        }
      });
    }
  )
);
