import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    const auth = this.props.auth;
    if (auth) {
      if (auth.credits < 1) {
        return <Redirect to="/surveys" />;
      }

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

    return null;
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

SurveyNew = connect(mapStateToProps)(SurveyNew);

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
