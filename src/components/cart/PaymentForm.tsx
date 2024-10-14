'use client';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Typography } from '@mui/material';
import { PaymentFormContent } from './PaymentFormContent';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  amount: number;
  userId: number | undefined;
  isFormValid: boolean;
};

export default function PaymentForm({ amount, userId, isFormValid }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: convertToSubcurrency(amount),
      }}
    >
      <Typography variant="h3">Payment Info</Typography>
      <PaymentFormContent
        amount={amount}
        userId={Number(userId)}
        isFormValid={isFormValid}
      />
    </Elements>
  );
}
