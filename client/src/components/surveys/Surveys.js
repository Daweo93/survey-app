import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import { fetchSurveys } from '../../actions/';
import SurveysList from './SurveysList';

/**
 * Surveys display list of created surveys.
 */
class Surveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  newSurveyClick = () => {
    if (this.props.auth.credits < 1) {
      return window.Materialize.toast(
        'You must buy credits to send survey!',
        2000
      );
    }

    this.props.history.push('/surveys/new');
  };

  render() {
    return (
      <Aux>
        <SurveysList surveys={this.props.surveys} />
        <div className="fixed-action-btn">
          <a
            onClick={this.newSurveyClick}
            className="btn-floating btn-large waves-effect waves-light red"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
      </Aux>
    );
  }
}

function mapStateToProps({ auth, surveys }) {
  return {
    surveys,
    auth
  };
}

export default connect(mapStateToProps, { fetchSurveys })(Surveys);
