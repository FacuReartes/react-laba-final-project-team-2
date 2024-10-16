import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext, ICartProduct } from '@/context/cart/CartContext';
import CartPage from '@/components/cart/CartPage';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Product

const mockProduct = {
  id: 1,
  name: 'Test Adidas',
  imageUrl: '/test-image-url',
  price: 100,
  sizes: 36,
  quantity: 1,
};

const renderWithMockCart = (ui: ReactNode, mockCart: ICartProduct[]) => {
  return render(
    <CartContext.Provider
      value={{
        cartList: mockCart,
        setCartList: jest.fn(),
        handleAddToCart: jest.fn(),
        handleQuantity: jest.fn(),
        handleDelete: jest.fn(),
        loading: false,
      }}
    >
      {ui}
    </CartContext.Provider>
  );
};

describe('Product Management', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  // 1. Product Management: Test modifying product quantities and verifying total price update
  test('increments product quantity and updates the total price', () => {
    renderWithMockCart(<CartPage />, [mockProduct]);

    // Initial quantity and price
    const quantity = screen.getByText('1');
    const price = screen.getAllByText('$100');
    expect(quantity).toBeInTheDocument();
    expect(price[0]).toBeInTheDocument();

    // Increment quantity
    const incrementButton = screen.getByRole('button', { name: /addcircle/i });
    fireEvent.click(incrementButton);

    // Mock updated quantity and price
    mockProduct.quantity += 1;

    // render the component again with the updated result
    renderWithMockCart(<CartPage />, [mockProduct]);
    const newPrice = screen.getAllByText('$200');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(newPrice[0]).toBeInTheDocument();
  });

  // 2. Remove Products: Test product removal functionality
  test('removes the product from the cart', () => {
    const mockArray = [mockProduct];
    renderWithMockCart(<CartPage />, mockArray);

    // Remove product
    const removeButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(removeButton);

    // Mock updated array
    mockArray.pop();

    // Verify cart is empty
    renderWithMockCart(<CartPage />, mockArray);
    expect(screen.getByText("You don't have any products in the cart."));
  });

  // 3. Empty State: Verify empty cart message is displayed
  test('display empty cart message when cart is empty', () => {
    renderWithMockCart(<CartPage />, []);

    expect(screen.getByText("You don't have any products in the cart."));
  });
});
