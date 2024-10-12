import OrderHistoryForm from '@/components/profile/order-history/OrderHistoryForm';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

const mockOrders = [
  {
    id: 1,
    date: '01.12.2023',
    status: 'Shipped',
    products: [
      { id: 1279, size: { id: 13, value: 45 }, quantity: 2 },
      { id: 1444, size: { id: 14, value: 46 }, quantity: 1 },
    ],
    summary: 192.34,
    discont: 18,
    delivery: {
      id: 233,
      company_name: 'Meest',
      company_address: 'London',
      company_contact: '999999999',
    },
    customer: {
      id: 231,
      name: 'Angelina Jones',
      email: 'angelina@gmail.com',
      phone: '+38 (095) 1234567',
      address: 'Baker Street 221b, London',
    },
    payment: 'After payment',
  },
  {
    id: 1,
    date: '01.12.2023',
    status: 'Shipped',
    products: [
      { id: 1279, size: { id: 13, value: 45 }, quantity: 2 },
      { id: 1444, size: { id: 14, value: 46 }, quantity: 1 },
    ],
    summary: 192.34,
    discont: 18,
    delivery: {
      id: 233,
      company_name: 'Meest',
      company_address: 'London',
      company_contact: '999999999',
    },
    customer: {
      id: 231,
      name: 'Angelina Jones',
      email: 'angelina@gmail.com',
      phone: '+38 (095) 1234567',
      address: 'Baker Street 221b, London',
    },
    payment: 'After payment',
  },
  {
    id: 2,
    date: '01.12.2023',
    status: 'Received',
    products: [
      { id: 1767, size: { id: 13, value: 45 }, quantity: 2 },
      { id: 1589, size: { id: 14, value: 46 }, quantity: 1 },
    ],
    summary: 192.34,
    discont: 18,
    delivery: {
      id: 233,
      company_name: 'Meest',
      company_address: 'London',
      company_contact: '999999999',
    },
    customer: {
      id: 231,
      name: 'Angelina Jones',
      email: 'angelina@gmail.com',
      phone: '+38 (095) 1234567',
      address: 'Baker Street 221b, London',
    },
    payment: 'After payment',
  },
  {
    id: 3,
    date: '01.12.2023',
    status: 'Canceled',
    products: [
      { id: 1803, size: { id: 13, value: 45 }, quantity: 2 },
      { id: 1722, size: { id: 14, value: 46 }, quantity: 1 },
    ],
    summary: 192.34,
    discont: 18,
    delivery: {
      id: 233,
      company_name: 'Meest',
      company_address: 'London',
      company_contact: '999999999',
    },
    customer: {
      id: 231,
      name: 'Angelina Jones',
      email: 'angelina@gmail.com',
      phone: '+38 (095) 1234567',
      address: 'Baker Street 221b, London',
    },
    payment: 'After payment',
  },
];

export const metadata: Metadata = {
  title: 'Order History',
  description: 'Order History',
};

export default async function Page() {
  const queryClient = new QueryClient();

  // for (const order of mockOrders) {
  //   for (const product of order.products) {
  //     const { queryKey, queryFn } = useGetProductDetail(product.id);
  //     await queryClient.prefetchQuery({ queryKey, queryFn });
  //   }
  // }
  const uniqueProductIds = new Set<number>();
  mockOrders.forEach(order => {
    order.products.forEach(product => {
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
      <OrderHistoryForm orders={mockOrders} />
    </HydrationBoundary>
  );
}
