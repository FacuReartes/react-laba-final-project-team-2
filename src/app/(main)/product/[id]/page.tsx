import ProductDetail from '@/components/common/ProductDetail/ProductDetail';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetProductDetail(params.id));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail params={params.id} />
    </HydrationBoundary>
  );
}
