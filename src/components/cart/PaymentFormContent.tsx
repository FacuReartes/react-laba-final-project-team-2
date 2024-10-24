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
import { PersonalInfoData, ShippingFormData } from '@/lib/definitions';
import { Box } from '@mui/material';

type Props = {
  amount: number;
  userId: number | undefined;
  isFormValid: boolean;
  personalInfo: PersonalInfoData;
  shippingInfo: ShippingFormData;
};

export const PaymentFormContent = ({
  amount,
  userId,
  isFormValid,
  personalInfo,
  shippingInfo,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const { cartList, setCartList } = useContext(CartContext) as ICartContext;
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount > 0 && userId) {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          userId,
          personalInfo,
          products: cartList,
          shippingInfo,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setClientSecret(data.clientSecret);
        });
    }
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
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}

      {error && <p>{error}</p>}
      <Box sx={{ margin: '40px 0' }}>
        <ActionButton
          text={!loading ? `Confirm & Pay $ ${amount}` : 'Processing...'}
          isLoading={!stripe || loading || !isFormValid}
        />
      </Box>
    </form>
  );
};
