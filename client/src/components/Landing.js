import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux';

class Landing extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.history.push('/surveys');
    }
  }

  render() {
    return (
      <Aux>
        <h1 className="center">Surveyed</h1>
        <h5 className="center">Collect feedback from your users</h5>
      </Aux>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Landing);
