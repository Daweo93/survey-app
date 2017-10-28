import sendgrid, { mail as helper } from 'sendgrid';
import config from '../config/config';

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(config.sendGridKey);
    this.from_email = new helper.Email('no-reply@emailer.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // Use method from Mail class to add content of mail
    this.addContent(this.body);

    // Enable click tracking
    this.addClickTracking();

    // Add recipients
    this.addRecipients();
  }

  /**
  * @param {array} recipients - array of object with emails
  * @return {array} return array of recipients emails
  */
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  /**
   * Setup click tracking in SendGrid
   */
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  /**
   * Add recipients to email
   * @param {array} recipients - array contains formated recipients
   */
  addRecipients(recipients) {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  /**
   * SendGrid API request which send e-mails
   * @return {Object} - response
   */
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

export default Mailer;
