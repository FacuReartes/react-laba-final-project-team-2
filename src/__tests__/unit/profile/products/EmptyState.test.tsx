import { render, screen } from '@testing-library/react';
import Products from '@/components/profile/ProductsContainer';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Products empty state', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });
  it('should render the empty state when there are no products', () => {
    // Render the Products component with an empty product array
    render(<Products products={[]} />);

    // Check if the ProductsEmptyState component is rendered
    expect(
      screen.getByText(/You dont have any products yet./i)
    ).toBeInTheDocument();
  });
});
