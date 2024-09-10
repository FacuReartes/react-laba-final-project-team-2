import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProductsEmptyState() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
        You don&apos;t have any products yet.
      </Typography>
      <Button
        onClick={() => router.push('/profile/products/add-product')}
        variant="contained"
        disableElevation
        size="large"
        sx={{
          bgcolor: 'secondary.light',
          color: '#fff',
          height: '40px',
          transition: 'opacity .2s ease',
          ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          borderRadius: 2,
        }}
      >
        Add Product
      </Button>
    </Box>
  );
}
