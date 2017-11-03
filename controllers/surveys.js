import mongoose from 'mongoose';
import Path from 'path-parser';
import _ from 'lodash';
import { URL } from 'url';
import Mailer from '../services/Mailer';
import surveyTemplate from '../views/emailTemplate/surveyTemplate';
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

/**
 * Update survey data with answer
 */
export const updateSurvey = (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);

      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
};

/**
 * Get all surveys 
 * @param {Object} Request
 * @param {Object} Response
 */
export const getSurveys = async (req, res) => {
  const surveys = await Survey.find({
    _user: req.user.id
  })
    .select({
      recipients: false
    })
    .sort({ dateSent: -1 });

  res.send(surveys);
};
