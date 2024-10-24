import OrderHistoryForm from '@/components/profile/order-history/OrderHistoryForm';
import useGetProductDetail from '@/hooks/products/useGetProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const metadata: Metadata = {
  title: 'Order History',
  description: 'Order History',
};

export default async function Page() {
  const queryClient = new QueryClient();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>Please log in to view your order history.</div>;
  }

  const userId = session.user.user.id;

  const orders = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order-history?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(res => res.json());

  const uniqueProductIds = new Set<number>();
  orders.map((order: any, index: number) => {
    order.products.forEach((product: any) => {
      uniqueProductIds.add(product.id);
    });
  });

  const prefetchPromises = Array.from(uniqueProductIds).map(productId => {
    const { queryKey, queryFn } = useGetProductDetail(productId);
    return queryClient.prefetchQuery({ queryKey, queryFn });
  });

  await Promise.all(prefetchPromises);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderHistoryForm orders={orders} />
    </HydrationBoundary>
  );
}
