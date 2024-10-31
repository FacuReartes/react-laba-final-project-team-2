import { render, screen } from '@testing-library/react';
import { CartContext, ICartProduct } from '@/context/cart/CartContext';
import { PersonalInfoData, ShippingFormData } from '@/lib/definitions';
import PaymentForm from '@/components/cart/PaymentForm';
import { ReactNode } from 'react';

const mockPersonalInfo: PersonalInfoData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
};

const mockShippingInfo: ShippingFormData = {
  country: 'USA',
  city: 'Somewhere',
  state: 'CA',
  zip: '90210',
  address: '123 Main St',
};

const mockProduct: ICartProduct = {
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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PaymentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Payment Method selection', () => {
    renderWithMockCart(
      <PaymentForm
        amount={100}
        userId={1}
        isFormValid={true}
        personalInfo={mockPersonalInfo}
        shippingInfo={mockShippingInfo}
      />,
      [mockProduct]
    );

    expect(screen.getByText('Payment Info')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /card/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /after-payment/i })
    ).toBeInTheDocument();
  });
});
