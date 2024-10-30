'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AddProductButton({
  display,
}: {
  display: { xs: string; md: string };
}) {
  const router = useRouter();
  return (
    <Button
      role="button"
      onClick={() => router.push('/profile/products/add-product')}
      variant="contained"
      disableElevation
      size="large"
      sx={{
        display,
        bgcolor: 'secondary.light',
        color: 'common.white',
        height: '40px',
        textTransform: 'capitalize',
        transition: 'opacity .2s ease',
        ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
        borderRadius: 2,
        mr: { md: '20px' },
        mt: { xs: '60px', md: 0 },
      }}
    >
      Add product
    </Button>
  );
}
