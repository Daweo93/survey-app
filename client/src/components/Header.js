import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Payments from './Payments';
import { userLogout } from '../actions';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google" color="contrast">
              Login with Google
            </a>
          </li>
        );
      default:
        return [
          <li key="p">
            <Payments />
          </li>,
          <li key="c" className="credits">
            Credits: {this.props.auth.credits}
          </li>,
          <li key="l">
            <a onClick={() => this.props.userLogout(this.props.history)}>
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="blue darken-3">
        <div className="row">
          <div className="nav-wrapper col s12">
            <Link to={this.props.auth ? '/surveys' : '/'} className="logo">
              Surveyed
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { userLogout })(withRouter(Header));
