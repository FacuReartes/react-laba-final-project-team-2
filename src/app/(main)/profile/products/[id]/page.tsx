import ProductDetail from '@/components/profile/ProductDetail';
import { Box } from '@mui/material';

export default function Page({ params }: { params: { id: number } }) {
  return (
    <Box
      sx={{
        pb: 4,
        display: 'flex',
        ml: 1,
        width: 1,
      }}
    >
      <ProductDetail id={params.id} />
    </Box>
  );
}
