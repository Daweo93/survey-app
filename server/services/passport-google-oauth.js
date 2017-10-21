import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import config from '../config';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token: ', accessToken);
      console.log('refresh token: ', refreshToken);
      console.log('profile', profile);
    }
  )
);
