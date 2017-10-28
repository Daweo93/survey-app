import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from 'react-aux';
import Payments from './Payments';

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
        return (
          <Aux>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <Link to="/api/logout">Logout</Link>
            </li>
          </Aux>
        );
    }
  }

  render() {
    return (
      <nav className="blue darken-3 ">
        <div className="row">
          <div className="nav-wrapper col s12">
            <Link
              className="brand-logo"
              to={this.props.auth ? '/surveys' : '/'}
            >
              Survejer
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
