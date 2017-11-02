import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormPreview from './SurveyFormPreview';

/**
 * SurveyNew shows SurveyForm and SurveyFormReview components
 */
class SurveyNew extends Component {
  state = {
    showForPreview: false
  };

  render() {
    if (this.state.showForPreview) {
      return (
        <SurveyFormPreview
          hidePreview={() => this.setState({ showForPreview: false })}
        />
      );
    }

    return (
      <SurveyForm showPreview={() => this.setState({ showForPreview: true })} />
    );
  }
}

export default SurveyNew;
