'use client';
import { Box, Typography } from '@mui/material';
import PaymentForm from '@/components/cart/PaymentForm';
import PersonalInfo from '@/components/cart/PersonalInfo';
import ShippingInfo from '@/components/cart/ShippingInfo';
import Link from 'next/link';
import Summary from '@/components/cart/Summary';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  searchParams: { total: string; userId: string };
};

export default function Page({ searchParams }: Props) {
  const amount = parseFloat(searchParams.total);
  const userId = searchParams.userId;
  const SHIPPING = 20;
  const { data: session } = useSession();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    country: '',
    city: '',
    state: '',
    zip: '',
    address: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const isPersonalInfoValid = Object.values(personalInfo).every(
      value => value !== ''
    );
    const isShippingInfoValid = Object.values(shippingInfo).every(
      value => value !== ''
    );
    setIsFormValid(isPersonalInfoValid && isShippingInfoValid);

    if (!isPersonalInfoValid || !isShippingInfoValid) {
      setErrorMessage('Please fill in all fields');
    }
  }, [personalInfo, shippingInfo]);

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '800px',
          ml: '352px',
        }}
      >
        <Link
          style={{
            color: 'gray',
            textDecoration: 'underline',
            marginTop: '10px',
          }}
          href="/cart"
        >
          Back to cart
        </Link>
        <Typography variant="h1">Checkout</Typography>
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          isLoggedIn={Boolean(session)}
          setErrorMessage={setErrorMessage}
        />
        <ShippingInfo
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <PaymentForm
          amount={amount}
          userId={Number(userId)}
          isFormValid={isFormValid}
        />
      </Box>
      <Box sx={{ mt: '50px' }}>
        <Summary subtotal={amount - SHIPPING} loading={false} />
      </Box>
    </Box>
  );
}
