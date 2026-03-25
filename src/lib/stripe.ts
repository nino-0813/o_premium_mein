import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function getStripeServer() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }

  if (!stripe) {
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  return stripe;
}

