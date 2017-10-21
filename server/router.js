import express from 'express';
import passport from 'passport';

const router = express.Router();

// Router to get first authentication call which give back secret code
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Router to resolve secret code and give back profile information
router.get('/auth/google/callback', passport.authenticate('google'));

export default router;
