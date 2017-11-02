import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormPreview from './SurveyFormPreview';
import { reduxForm } from 'redux-form';

/**
 * SurveyNew shows SurveyForm and SurveyFormReview components
 */
class SurveyNew extends Component {
  state = {
    showFormPreview: false
  };

  render() {
    if (this.state.showFormPreview) {
      return (
        <SurveyFormPreview
          hidePreview={() => this.setState({ showFormPreview: false })}
        />
      );
    }

    return (
      <SurveyForm
        showPreview={() => this.setState({ showFormPreview: true })}
      />
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
