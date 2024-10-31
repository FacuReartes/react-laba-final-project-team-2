import ProductDetail from '@/components/common/ProductDetail/ProductDetail';
import RecentlyViewedContainer from '@/components/recentlyViewed/RecentlyViewedContainer';
import { CartContext } from '@/context/cart/CartContext';
import { WishListContext } from '@/context/wishlist/WishListContext';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: { user: { jwt: 'token', user: { id: 'userId' } } },
    };
  },
}));
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return 'localhost:3000/profile/product/1';
  },
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery() {
    return {
      data: mockProduct[0],
    };
  },
}));

const renderWithContext = (ui: ReactNode) => {
  return render(
    <WishListContext.Provider
      value={{
        wishList: [],
        addWish: jest.fn(),
        removeWish: jest.fn(),
        isSuccess: true,
        handleClose: jest.fn(),
        message: '',
      }}
    >
      <CartContext.Provider
        value={{
          cartList: [],
          setCartList: jest.fn(),
          handleAddToCart: jest.fn(),
          handleQuantity: jest.fn(),
          handleDelete: jest.fn(),
          loading: false,
        }}
      >
        {ui}
      </CartContext.Provider>
    </WishListContext.Provider>
  );
};

const mockProduct = [
  {
    id: 99,
    attributes: {
      name: 'test',
      description: 'test',
      price: 10,
      createdAt: '1',
      updatedAt: '1',
      publishedAt: '1',
      teamName: 'team-2',
      images: {
        data: [
          {
            id: 1,
            attributes: {
              url: '/no-url',
              name: 'image-name',
            },
          },
        ],
      },
      brand: 1,
      categories: [1],
      color: 1,
      gender: {
        data: {
          attributes: {
            name: 'Male',
          },
        },
      },
      sizes: {
        data: [
          {
            id: 1,
            attributes: {
              value: 1,
            },
          },
        ],
      },
    },
  },
];

beforeEach(() => localStorage.clear());

describe('Recently Viewed Tests', () => {
  it('Product should be correctly stored in browser storage when viewed', () => {
    jest.spyOn(Storage.prototype, 'setItem');

    renderWithContext(<ProductDetail params={1} />);

    // Local storage is called with the product data
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'recently-watched',
      JSON.stringify(mockProduct)
    );
  });

  it('User should be able to see all recently viewed products', () => {
    // Mock a list of 3 products and save them to storage
    const productList = Array(3)
      .fill('')
      .map((product, index) => {
        product = { ...mockProduct[0] };
        product.id = index;
        return product;
      });

    localStorage.setItem('recently-watched', JSON.stringify(productList));

    renderWithContext(<RecentlyViewedContainer />);

    // We get 3 products displayed
    expect(screen.getAllByRole('product')).toHaveLength(3);
  });

  it('User should be able to see empty state', () => {
    renderWithContext(<RecentlyViewedContainer />);

    expect(screen.queryAllByRole('product')).toHaveLength(0);
    expect(
      screen.queryByText(/You haven't watched any products recently./i)
    ).toBeInTheDocument();
  });

  it('Old products should be deleted when reaching the product limit', () => {
    // Mock a list of 12 (max length) products and save them to storage
    const productList = Array(12)
      .fill('')
      .map((product, index) => {
        product = { ...mockProduct[0] };
        product.id = index;
        return product;
      });

    localStorage.setItem('recently-watched', JSON.stringify(productList));

    expect(JSON.parse(localStorage.getItem('recently-watched')!)).toHaveLength(
      12
    );

    renderWithContext(<ProductDetail params={1} />);

    const newProductList = JSON.parse(
      localStorage.getItem('recently-watched')!
    );
    // Length stays the same, and the last item (id = 11) has been erased
    expect(newProductList).toHaveLength(12);
    expect(
      newProductList.find((product: { id: number }) => product.id === 11)
    ).toBeFalsy();
  });

  it('Products should not be repeated', () => {
    localStorage.setItem('recently-watched', JSON.stringify(mockProduct));

    renderWithContext(<ProductDetail params={1} />);

    // Same product has been filtered out, keeping a length of 1
    expect(JSON.parse(localStorage.getItem('recently-watched')!)).toHaveLength(
      1
    );
  });
});
