import { render, screen } from '@testing-library/react';
import MyWishListContainer from '@/components/wishList/MyWishListContainer';
import { ReactNode } from 'react';
import { WishListContext } from '@/context/wishlist/WishListContext';
import { APIProductsType } from '@/lib/apiDataTypes';
import ProductsWishList from '@/components/wishList/ProductsWishList';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockWishList: APIProductsType[] = [
  {
    id: 1,
    attributes: {
      name: 'Product 1',
      price: 100,
      createdAt: '',
      description: '',
      publishedAt: '',
      teamName: '',
      updatedAt: '',
      gender: {
        data: {
          id: 1,
          attributes: {
            name: 'Men',
          },
        },
      },
      categories: {
        data: [
          {
            id: 1,
            attributes: {
              name: 'Casual',
            },
          },
        ],
      },
      sizes: {
        data: [
          {
            id: 1,
            attributes: {
              value: 37,
            },
          },
        ],
      },
      brand: {
        data: {
          id: 1,
          attributes: {
            name: 'Nike',
          },
        },
      },
      color: {
        data: {
          id: 1,
          attributes: {
            name: 'Black',
          },
        },
      },
      images: {
        data: [
          {
            id: 1,
            attributes: {
              url: '',
              width: 200,
              height: 200,
              formats: {
                thumbnail: {
                  url: '',
                  width: 200,
                  height: 200,
                },
              },
            },
          },
        ],
      },
    },
  },
];

const renderWithMockWishList = (ui: ReactNode, mockWish: APIProductsType[]) => {
  return render(
    <WishListContext.Provider
      value={{
        wishList: mockWish,
        removeWish: jest.fn(),
        addWish: jest.fn(),
        isSuccess: true,
        handleClose: jest.fn(),
        message: 'New product has been added to the wishlist successfully',
      }}
    >
      {ui}
    </WishListContext.Provider>
  );
};

describe('MyWishListContainer', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render the wishlist heading', () => {
    renderWithMockWishList(<MyWishListContainer />, mockWishList);
    const heading = screen.getByRole('heading', { name: /my wishlist/i });
    expect(heading).toBeInTheDocument();
  });
});

describe('Products Wishlist', () => {
  it('should render product items when wishlist has products', () => {
    renderWithMockWishList(<ProductsWishList />, mockWishList);
    const product = screen.getByText(/product 1/i);
    expect(product).toBeInTheDocument();
  });

  it('should render empty state when wishlist is empty', () => {
    renderWithMockWishList(<ProductsWishList />, []);
    const emptyState = screen.getByText(
      /You dont have any products in your wishlist yet./i
    );
    expect(emptyState).toBeInTheDocument();
  });
});
