import express from 'express';
import passport from 'passport';
import stripePayment from './controllers/payments';
import { createSurvey, updateSurvey, getSurveys } from './controllers/surveys';
import requireLogin from './middlewares/requireLogin';
import requireCredits from './middlewares/requireCredits';
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
  res.send(req.user);
});

// Router which send back current user
router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

// Route to handle payment
router.post('/api/stripe', requireLogin, stripePayment);

// Route to handle creating surveys
router.post('/api/surveys', requireLogin, requireCredits, createSurvey);

// Router to get all of surveys
router.get('/api/surveys', requireLogin, getSurveys);

// Route to handle thank you page
router.get('/api/surveys/:surveyId/:answer', (req, res) => {
  res.send('Thank you for feedback!');
});

// Router to handle SendGrid webhook
router.post('/api/surveys/webhooks', updateSurvey);

export default router;
