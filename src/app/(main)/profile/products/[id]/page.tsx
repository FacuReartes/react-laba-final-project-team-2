import ProductDetail from '@/components/common/ProductDetail/ProductDetail';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import { Box } from '@mui/material';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Page({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetProductDetail(params.id));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box
        sx={{
          pb: 4,
          display: 'flex',
          ml: 1,
          width: 1,
        }}
      >
        <ProductDetail params={params.id} />
      </Box>
    </HydrationBoundary>
  );
}
