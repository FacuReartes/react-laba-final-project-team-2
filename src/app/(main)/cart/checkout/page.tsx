import { Box, Typography } from '@mui/material';
import PaymentForm from '@/components/cart/PaymentForm';
import PersonalInfo from '@/components/cart/PersonalInfo';
import ShippingInfo from '@/components/cart/ShippingInfo';
import Link from 'next/link';
import Summary from '@/components/cart/Summary';

type Props = {
  searchParams: { total: string; userId: string };
};

export default function Page({ searchParams }: Props) {
  const amount = parseFloat(searchParams.total);
  const userId = searchParams.userId;
  const SHIPPING = 20;

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
        <PersonalInfo />
        <ShippingInfo />
        <PaymentForm amount={amount} userId={Number(userId)} />
      </Box>
      <Box sx={{ mt: '50px' }}>
        <Summary subtotal={amount - SHIPPING} loading={false} />
      </Box>
    </Box>
  );
}
