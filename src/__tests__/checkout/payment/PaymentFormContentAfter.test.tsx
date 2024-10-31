import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartContext, ICartProduct } from '@/context/cart/CartContext';
import { PersonalInfoData, ShippingFormData } from '@/lib/definitions';
import PaymentFormContentAfter from '@/components/cart/PaymentFormContentAfter';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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

class MockResponse {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Headers;
  url: string;

  constructor() {
    this.ok = true;
    this.status = 200;
    this.statusText = 'OK';
    this.headers = new Headers();
    this.url = '';
  }

  json() {
    return Promise.resolve({
      invoiceURL: '/path/to/invoice.pdf',
      invoiceId: '123',
    });
  }
}

describe('PaymentFormContentAfter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('submits form and generates invoice successfully', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (global.fetch as jest.Mock).mockResolvedValue(
      new MockResponse() as unknown as Response
    );

    renderWithMockCart(
      <PaymentFormContentAfter
        userId={1}
        personalInfo={mockPersonalInfo}
        isFormValid={true}
        shippingInfo={mockShippingInfo}
      />,
      [mockProduct]
    );

    fireEvent.submit(screen.getByTestId('payment-form'));

    expect(
      screen.getByRole('button', { name: /processing/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/checkout/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          personalInfo: mockPersonalInfo,
          shippingInfo: mockShippingInfo,
          products: [mockProduct],
        }),
      });

      expect(
        screen.getByRole('button', { name: /generate invoice/i })
      ).toBeInTheDocument();
      expect(pushMock).toHaveBeenCalledWith(
        '/cart/checkout/thank-you?payment_intent=123'
      );
    });
  });
});
