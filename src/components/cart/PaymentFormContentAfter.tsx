import { CartContext, ICartContext } from '@/context/cart/CartContext';
import { PersonalInfoData, ShippingFormData } from '@/lib/definitions';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ActionButton from '../common/ActionButton';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  userId: number | undefined;
  isFormValid: boolean;
  personalInfo: PersonalInfoData;
  shippingInfo: ShippingFormData;
}

export default function PaymentFormContentAfter({
  userId,
  personalInfo,
  isFormValid,
  shippingInfo,
}: Props) {
  const { cartList, setCartList } = useContext(CartContext) as ICartContext;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/checkout/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          personalInfo,
          shippingInfo,
          products: cartList,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }
      const data = await response.json();
      setLoading(false);

      const link = document.createElement('a');
      link.href = data.invoiceURL;
      link.download = 'invoice.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCartList([]);
      localStorage.removeItem('cart-list');

      router.push(`/cart/checkout/thank-you?payment_intent=${data.invoiceId}`);
    } catch (error: any) {
      setError(error?.message);
      console.error('Invoice creation error:', error?.message);
    }
  };

  return (
    <Box sx={{ margin: '40px 0' }}>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <ActionButton
          text={!loading ? `Generate Invoice` : 'Processing...'}
          isLoading={loading || !isFormValid}
        />
      </form>
    </Box>
  );
}
