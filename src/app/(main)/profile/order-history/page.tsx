import OrderHistoryForm from '@/components/profile/order-history/OrderHistoryForm';
import { env } from '../../../../../env';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { headers } from 'next/headers';

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

  const heads = headers()

  const host = (heads.get('referer')?.split('/').slice(0, 3).join('/'))

  const orders = await fetch(
    `${host}/api/order-history?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(res => res.json());

  const uniqueProductIds = new Set<number>();
  orders.map((order: any) => {
    order.products.forEach((product: any) => {
      uniqueProductIds.add(product.id);
    });
  });

  const prefetchPromises = Array.from(uniqueProductIds).map(productId => {
    const queryKey = [`product-${productId}`];

    const queryFn = async () => {
      const req = await fetch(
        `${env.BASE_URL}/products/${productId}?populate=*`
      );
      const res = await req.json();
      return res.data;
    };
    return queryClient.prefetchQuery({ queryKey, queryFn });
  });

  await Promise.all(prefetchPromises);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderHistoryForm orders={orders} />
    </HydrationBoundary>
  );
}
