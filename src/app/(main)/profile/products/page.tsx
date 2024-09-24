import Products from '@/components/profile/Products';
import useGetProducts from '@/hooks/useGetProducts';
import useUserQuery from '@/hooks/useUserQuery';
import { authOptions } from '@/lib/authOptions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.jwt;
  const userID = session?.user?.user?.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(useGetProducts(token, userID));
  await queryClient.prefetchQuery(useUserQuery(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  );
}
