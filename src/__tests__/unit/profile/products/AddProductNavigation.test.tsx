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

describe('Add product navigation', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
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

    const addButton1 = screen.getAllByRole('button', { name: 'Add Product' });
    fireEvent.click(addButton1[0]);

    expect(mockPush).toHaveBeenCalledWith('/profile/products/add-product');
  });
});
