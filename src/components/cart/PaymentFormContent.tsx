import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import ActionButton from '@/components/common/ActionButton';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { CartContext, ICartContext } from '@/context/cart/CartContext';
import { getBaseUrl } from '@/utils/getBaseUrl';

type Props = {
  amount: number;
  userId: number | undefined;
  isFormValid: boolean;
};

export const PaymentFormContent = ({ amount, userId, isFormValid }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { setCartList } = useContext(CartContext) as ICartContext;
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = getBaseUrl()

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
        return_url: `${url}/cart/checkout/thank-you?amount=${amount}`,
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
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}

      {error && <p>{error} {url}</p>}
      <ActionButton
        text={!loading ? `Confirm & Pay $ ${amount}` : 'Processing...'}
        isLoading={!stripe || loading || !isFormValid}
      />
    </form>
  );
};
