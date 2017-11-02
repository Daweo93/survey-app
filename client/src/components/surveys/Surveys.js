import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import { Link } from 'react-router-dom';
import { fetchSurveys } from '../../actions/';

/**
 * Surveys display list of created surveys.
 */
class Surveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const surveys = this.props.surveys;
    if (!surveys) {
      return <h3>No surveys</h3>;
    }

    return surveys.reverse().map(({ _id, title, body, no, yes, dateSent }) => {
      return (
        <div className="card" key={_id}>
          <div className="card-content">
            <p className="card-title">{title}</p>
            <p>{body}</p>
          </div>
          <div className="card-action clearfix">
            <div className="left">
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
            </div>
            <div className="right">
              Sent on: {new Date(dateSent).toLocaleDateString()}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <Aux>
        {this.renderSurveys()}
        <div className="fixed-action-btn">
          <Link
            to="/surveys/new"
            className="btn-floating btn-large waves-effect waves-light red"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </Aux>
    );
  }
}

function mapStateToProps({ surveys }) {
  return {
    surveys
  };
}

export default connect(mapStateToProps, { fetchSurveys })(Surveys);
