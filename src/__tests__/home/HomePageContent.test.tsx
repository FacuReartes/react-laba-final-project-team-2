import { render, screen } from '@testing-library/react';
import HomePageContent from '@/components/home/HomePageContent';
import { InfiniteData } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { CartContext, ICartContext } from '@/context/cart/CartContext';
import {
  WishListContext,
  IWishListContext,
} from '@/context/wishlist/WishListContext';
import { ReactNode } from 'react';

jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: { user: { jwt: 'token', user: { id: 'userId' } } },
    };
  },
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

const mockCartContext: ICartContext = {
  cartList: [],
  setCartList: jest.fn(),
  handleAddToCart: jest.fn(),
  handleQuantity: jest.fn(),
  handleDelete: jest.fn(),
  loading: false,
};

const mockWishListContext: IWishListContext = {
  wishList: [],
  addWish: jest.fn(),
  removeWish: jest.fn(),
  isSuccess: true,
  message: 'Item added to wishlist',
  handleClose: jest.fn(),
};

const MockProvider = ({ children }: { children: ReactNode }) => (
  <CartContext.Provider value={mockCartContext}>
    <WishListContext.Provider value={mockWishListContext}>
      {children}
    </WishListContext.Provider>
  </CartContext.Provider>
);

describe('HomePageContent', () => {
  const mockData: InfiniteData<any> = {
    pages: [
      {
        data: [
          {
            id: 1,
            attributes: {
              name: 'Product 1',
              price: 100,
              description: 'Description for Product 1',
              gender: {
                data: {
                  id: 1,
                  attributes: {
                    name: 'Men',
                  },
                },
              },
              images: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      url: 'https://example.com/image1.jpg',
                      width: 800,
                      height: 600,
                      formats: {
                        thumbnail: {
                          url: 'https://example.com/image1_thumbnail.jpg',
                          width: 200,
                          height: 150,
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Product 2',
              price: 200,
              description: 'Description for Product 2',
              gender: {
                data: {
                  id: 2,
                  attributes: {
                    name: 'Women',
                  },
                },
              },
              images: {
                data: [
                  {
                    id: 2,
                    attributes: {
                      url: 'https://example.com/image2.jpg',
                      width: 800,
                      height: 600,
                      formats: {
                        thumbnail: {
                          url: 'https://example.com/image2_thumbnail.jpg',
                          width: 200,
                          height: 150,
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        meta: {
          pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 2,
          },
        },
      },
    ],
    pageParams: [],
  };

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('shoes'),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
    });
  });

  it('should display loading component when isPending is true', () => {
    render(
      <MockProvider>
        <HomePageContent
          data={undefined}
          isPending={true}
          showFilters={false}
          setShowFilters={jest.fn()}
        />
      </MockProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display product information correctly when data is available', () => {
    render(
      <MockProvider>
        <HomePageContent
          data={mockData}
          isPending={false}
          showFilters={false}
          setShowFilters={jest.fn()}
        />
      </MockProvider>
    );

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('should display filters button correctly', () => {
    render(
      <MockProvider>
        <HomePageContent
          data={mockData}
          isPending={false}
          showFilters={false}
          setShowFilters={jest.fn()}
        />
      </MockProvider>
    );

    expect(
      screen.getByRole('button', { name: /show filters/i })
    ).toBeInTheDocument();
  });

  it('renders loading component when the data is pending', () => {
    render(
      <MockProvider>
        <HomePageContent
          data={undefined}
          isPending={true}
          showFilters={false}
          setShowFilters={jest.fn()}
        />
      </MockProvider>
    );
    expect(screen.getByText(/loading/i)).toBeVisible();
  });

  it('should display EmptyProducts when there are no products', () => {
    render(
      <MockProvider>
        <HomePageContent
          data={{ pages: [], pageParams: [] }}
          isPending={false}
          showFilters={false}
          setShowFilters={jest.fn()}
        />
      </MockProvider>
    );

    expect(
      screen.getByText(/There are no products match search/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Try to change filter values or search term to see results/i
      )
    ).toBeInTheDocument();
  });
});
