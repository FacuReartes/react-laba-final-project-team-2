import AddProductForm from '@/components/Product/Form/AddProductForm';
import useGetBrands from '@/hooks/products/useGetBrands';
import useGetCategories from '@/hooks/products/useGetCategories';
import useGetColors from '@/hooks/products/useGetColors';
import useGetGenders from '@/hooks/products/useGetGenders';
import useGetSizes from '@/hooks/products/useGetSizes';
import { Box, Typography } from '@mui/material';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add product',
  description: 'Add a product page',
};

export default async function AddProductPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetCategories());
  await queryClient.prefetchQuery(useGetBrands());
  await queryClient.prefetchQuery(useGetGenders());
  await queryClient.prefetchQuery(useGetColors());
  await queryClient.prefetchQuery(useGetSizes());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box
        sx={{
          padding: { xs: '24px 20px 84px', lg: '52px 15px', xl: '52px 68px' },
          m: 0,
          width: { lg: '100%', xs: '100vw' },
          position: 'relative',
          flex: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { lg: '45px', xs: '30px' } }}>
          Add a product
        </Typography>
        <Typography
          variant="subtitle3"
          sx={{
            mb: { lg: '40px', xs: '24px' },
            mt: { lg: '35px', xs: '12px' },
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          eveniet quia illum vel velit atque. Quibusdam cumque doloremque
          eveniet laboriosam dignissimos eligendi cupiditate molestias modi!
          Labore excepturi autem doloribus deleniti!
        </Typography>
        <AddProductForm />
      </Box>
    </HydrationBoundary>
  );
}
