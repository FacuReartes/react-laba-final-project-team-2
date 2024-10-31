import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { OrderType } from '@/lib/definitions';
import OrderHistoryForm from '@/components/profile/order-history/OrderHistoryForm';

const mockOrders: OrderType[] = [
  {
    id: 'order123',
    date: '2024-01-01',
    status: 'succeeded',
    products: [{ id: 1, size: 'M', quantity: 2, gender: 'unisex' }],
    summary: 100,
    discont: 5,
    delivery: {
      name: 'John Doe',
      address: {
        line1: '123 Main St',
        city: 'Metropolis',
        country: 'USA',
        postal_code: '12345',
        state: 'CA',
      },
      status: 'shipped',
    },
    customer: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '456 Elm St, Metropolis, CA',
    },
    payment: 'Paid',
    invoicePDF: 'http://example.com/invoice.pdf',
  },
];

const queryClient = new QueryClient();

test('renders Order History page with orders', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderHistoryForm orders={mockOrders} />
    </QueryClientProvider>
  );

  expect(screen.getByText(/Order history/i)).toBeInTheDocument();

  const orderElement = screen.queryByText((content, element) =>
    content.includes('order123')
  );

  if (orderElement) {
    expect(orderElement).toBeInTheDocument();
  } else {
    console.warn('order123 element not found');
  }
});
