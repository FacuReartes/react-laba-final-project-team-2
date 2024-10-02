import ProductDetail from '@/components/common/ProductDetail/ProductDetail';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import { Box } from '@mui/material';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

type Props = {
  params: { id: number };
};
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const req = await fetch(
    `https://shoes-shop-strapi.herokuapp.com/api/products/${params.id}?populate=*`
  );
  const res = await req.json();

  const productName = res.data?.attributes?.name || `Product ${params.id}`;
  return {
    title: productName,
  };
};

export default async function Page({ params }: Props) {
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
