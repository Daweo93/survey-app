import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormPreview = ({
  hidePreview,
  formValues,
  submitSurvey,
  history
}) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name} className="form-review">
        <p>
          <strong>{label}</strong>
        </p>
        {formValues[name]}
      </div>
    );
  });

  return (
    <div>
      <h3>Survey Form Preview</h3>
      <h6>Please confirm entered data</h6>
      {reviewFields}
      <button
        onClick={hidePreview}
        className="btn-flat white-text red darken-2 waves-effect"
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="btn-flat white-text right blue darken-2"
      >
        Send survey
        <i className="material-icons right">mail</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return {
    formValues: form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormPreview));
