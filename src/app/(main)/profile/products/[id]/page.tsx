import ProductDetail from '@/components/profile/ProductDetail';
import { Box } from '@mui/material';

export default function Page({ params }: { params: { id: string | number } }) {
  return (
    <Box sx={{ pb: 4 }}>
      My id: {params.id}
      <ProductDetail id={params.id} />
    </Box>
  );
}
