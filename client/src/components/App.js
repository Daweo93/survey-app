import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from 'material-ui';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Surveys from './Surveys';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Grid container>
          <Header />
          <Grid item xs={12}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Surveys} />
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
