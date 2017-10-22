import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import config from '../config/config';

const User = mongoose.model('users');

// Serialize User with the user ID to generate identifying piece of information
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User with the user ID to get user data
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Setup passport strategy which use Passport Google OAuth20
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if this user with given ID is already created
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // User already exist return it
        return done(null, existingUser);
      }

      // User doesn't exist, create it
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
