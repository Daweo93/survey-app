import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'material-ui';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emajler"
        description="$5 for 5 emails"
        amount={500}
        currency="PLN"
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button color="contrast">Buy Credits</Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
