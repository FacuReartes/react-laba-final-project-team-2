import { render, screen, fireEvent } from '@testing-library/react';
import Products from '@/components/profile/Products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('next-auth/react');
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const theme = createTheme();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Products Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render the user data and products when available', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { jwt: 'token', user: { id: 'userId' } } },
    });

    // Mock for useUserQuery
    (useQuery as jest.Mock).mockImplementation(queryKey => {
      if (queryKey[0] === 'user-data') {
        return {
          data: {
            firstName: 'Lucas',
            lastName: 'Montecino',
            avatar: { url: 'avatar-url' },
          },
        };
      }
      // Mock for useGetProducts
      if (queryKey[0] === 'products') {
        return {
          data: [{ id: 1, name: 'Product 1' }],
          isPending: false,
        };
      }

      return {};
    });

    render(<Products />, { wrapper: Wrapper });

    expect(screen.getByText('Lucas Montecino')).toBeInTheDocument();
    expect(screen.getByText('My products')).toBeInTheDocument();
  });

  it('should call router.push when Add product button is clicked', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { jwt: 'token', user: { id: 'userId' } } },
    });
    (useQuery as jest.Mock).mockImplementation(queryKey => {
      if (queryKey.queryFn.name === 'useUserQuery') {
        return {
          data: {
            firstName: 'Lucas',
            lastName: 'Montecino',
            avatar: { url: 'avatar-url' },
          },
        };
      }

      return {};
    });

    render(<Products />, { wrapper: Wrapper });

    const addButton = screen.getByText('Add product');
    fireEvent.click(addButton);

    expect(mockPush).toHaveBeenCalledWith('/profile/products/add-product');
  });
});
