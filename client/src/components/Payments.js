import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emajler"
        description="5PLN for 5 emails"
        amount={500}
        currency="PLN"
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <a className="btn light-blue darken-2 waves-effect" color="contrast">
          Buy Credits
        </a>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
