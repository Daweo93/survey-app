import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, withStyles } from 'material-ui';

const styles = theme => ({
  logo: {
    flex: 1,
    color: '#ffffff',
    fontSize: '22px',
    fontFamily: 'Roboto',
    textDecoration: 'none'
  }
});

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Button href="/auth/google" color="contrast">
            Login with Google
          </Button>
        );
      default:
        return (
          <Button href="/api/logout" color="contrast">
            Logout
          </Button>
        );
    }
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className={this.props.classes.logo}
          >
            Survejer
          </Link>
          {this.renderContent()}
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
