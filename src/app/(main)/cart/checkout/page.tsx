import { Box } from '@mui/material';
import PaymentForm from '@/components/cart/PaymentForm';

type Props = {
  searchParams: { total: string; userId: string };
};

export default function Page({ searchParams }: Props) {
  const amount = parseFloat(searchParams.total);
  const userId = searchParams.userId;

  return (
    <Box>
      <PaymentForm amount={amount} userId={Number(userId)} />
    </Box>
  );
}
