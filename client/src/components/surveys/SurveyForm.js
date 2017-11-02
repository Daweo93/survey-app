import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';
/**
 * SurveyForm shows a form for a user to add new survey
 */
class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          type="text"
          component={SurveyField}
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Survey Form</h3>
        <form onSubmit={this.props.handleSubmit(this.props.showPreview)}>
          {this.renderFields()}
          <Link
            to="/surveys"
            className="btn-flat white-text red darken-2 waves-effect"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn-flat white-text blue darken-2 right waves-effect"
          >
            Preview
            <i className="material-icons right">chevron_right</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value!';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
