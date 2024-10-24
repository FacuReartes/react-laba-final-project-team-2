'use client';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Typography } from '@mui/material';
import { PaymentFormContent } from './PaymentFormContent';
import { PersonalInfoData, ShippingFormData } from '@/lib/definitions';
import { useState } from 'react';
import PaymentMethodToogle from './PaymentMethodToogle';
import PaymentFormContentAfter from './PaymentFormContentAfter';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  amount: number;
  userId: number | undefined;
  isFormValid: boolean;
  personalInfo: PersonalInfoData;
  shippingInfo: ShippingFormData;
};

export default function PaymentForm({
  amount,
  userId,
  isFormValid,
  personalInfo,
  shippingInfo,
}: Props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: convertToSubcurrency(amount),
      }}
    >
      <Typography sx={{ mt: '30px' }} variant="h3">
        Payment Info
      </Typography>
      <PaymentMethodToogle
        method={paymentMethod}
        setMethod={setPaymentMethod}
      />
      {personalInfo.firstName !== '' &&
        shippingInfo.address !== '' &&
        paymentMethod === 'card' && (
          <PaymentFormContent
            amount={amount}
            userId={Number(userId)}
            isFormValid={isFormValid}
            personalInfo={personalInfo}
            shippingInfo={shippingInfo}
          />
        )}
      {paymentMethod === 'after-payment' && (
        <PaymentFormContentAfter
          userId={userId}
          isFormValid={isFormValid}
          personalInfo={personalInfo}
          shippingInfo={shippingInfo}
        />
      )}
    </Elements>
  );
}
