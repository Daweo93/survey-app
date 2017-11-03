import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return {
      auth
    };
  }

  return connect(mapStateToProps)(Authentication);
};
