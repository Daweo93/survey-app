import express from 'express';
import passport from 'passport';
import stripePayment from './services/payments';
import requireLogin from './middlewares/requireLogin';
const router = express.Router();

// Router to get first authentication call which give back secret code
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Router to resolve secret code and give back profile information
router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/surveys');
  }
);

// Route to logout from our app
router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Router which send back current user
router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

// Route to handle payment
router.post('/api/stripe', requireLogin, stripePayment);

export default router;
