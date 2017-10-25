import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  withStyles,
  Typography
} from 'material-ui';

const styles = theme => ({
  logo: {
    flex: 1,
    color: '#ffffff',
    fontSize: '22px',
    fontFamily: 'Roboto',
    textDecoration: 'none'
  },
  credits: {
    marginRight: '16px'
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
          <Grid container alignItems="center" justify="flex-end">
            <Typography color="inherit" className={this.props.classes.credits}>
              Credits: {this.props.auth.credits}
            </Typography>
            <Payments />
            <Button href="/api/logout" color="contrast">
              Logout
            </Button>
          </Grid>
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
