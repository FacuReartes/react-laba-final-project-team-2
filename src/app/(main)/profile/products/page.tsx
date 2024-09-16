import Products from '@/components/profile/Products';
import useGetProducts from '@/hooks/useGetProducts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function ProductsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetProducts());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  );
}
