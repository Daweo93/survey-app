import config from '../config/config';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripeSecretKey);

export default async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'pln',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();
};
