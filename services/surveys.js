import mongoose from 'mongoose';
import Mailer from './Mailer';
import surveyTemplate from './emailTemplate/surveyTemplate';
const Survey = mongoose.model('surveys');

export const createSurvey = async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  // Create survey
  const survey = new Survey({
    _user: req.user.id,
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    dateSent: new Date()
  });

  // Create new email
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    // Send mail
    await mailer.send();

    // Save survey to database
    await survey.save();

    // Charge user for sent survey
    req.user.credits -= 1;
    const user = await req.user.save();

    // Send updated user back
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
};
