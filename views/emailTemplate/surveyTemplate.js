import config from '../../config/config';

export default survey => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <div style="text-align: center;">
      <h3>I'd like to see your opinion</h3>
      <p>Please answer following question</p>
      <p> ${survey.body} </p>
      <div>
        <a href="${config.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a> or 
        <a href="${config.redirectDomain}/api/surveys/${survey.id}/no">No</a>
      </div>
    </div>
  </body>
  </html>
  `;
};
