'use client';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import ActionButton from '@/components/common/ActionButton';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { CartContext, ICartContext } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  amount: number;
  userId: number | undefined;
};

export const PaymentFormContent = ({ amount, userId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { setCartList } = useContext(CartContext) as ICartContext;

  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount), userId }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [amount, userId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    setCartList([]);
    localStorage.removeItem('cart-list');

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message!);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/cart/checkout/thank-you?amount=${amount}`,
      },
    });

    if (error) {
      setError(error.message!);
      setLoading(false);
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '90%',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {clientSecret && <PaymentElement />}

      {error && <p>{error}</p>}
      <ActionButton
        text={!loading ? `Pay $ ${amount}` : 'Processing...'}
        isLoading={!stripe || loading}
      />
    </form>
  );
};

export default function PaymentForm({ amount, userId }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        currency: 'usd',
        amount: convertToSubcurrency(amount),
      }}
    >
      <PaymentFormContent amount={amount} userId={Number(userId)} />
    </Elements>
  );
}
