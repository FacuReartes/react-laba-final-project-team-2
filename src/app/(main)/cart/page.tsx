import CartPage from '@/components/cart/CartPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart',
};

export default function Page() {
  return <CartPage />;
}
