import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import requireAuth from './hoc/requireAuth';
import Header from './Header';
import Landing from './Landing';
import Surveys from './surveys/Surveys';
import SurveysNew from './surveys/SurveysNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={requireAuth(Surveys)} />
            <Route exact path="/surveys/new" component={requireAuth(SurveysNew)} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
