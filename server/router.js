import express from 'express';
import passport from 'passport';
import passportGoogleOauth from './services/passport-google-oauth';

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'));

export default router;