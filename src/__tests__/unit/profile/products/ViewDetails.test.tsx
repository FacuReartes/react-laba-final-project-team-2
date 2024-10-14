import { render, screen, fireEvent } from '@testing-library/react';
import ProductsModal from '@/components/profile/ProductsModal';
import { ReactNode } from 'react';

jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };

  // Add display name to avoid ESLint warning
  Link.displayName = 'Link';
  return Link;
});

describe('ProductsModal component', () => {
  const productId = '123';

  it('should navigate to the correct product page when "View" is clicked', () => {
    // Render the ProductsModal component
    render(<ProductsModal open={true} id={productId} />);

    // Find the "View" link and click it
    const viewLink = screen.getByText(/view/i);
    expect(viewLink).toBeInTheDocument();

    // Simulate the click
    fireEvent.click(viewLink);

    // Assert that the link has the correct href
    expect(viewLink.closest('a')).toHaveAttribute(
      'href',
      `/profile/products/${productId}`
    );
  });
});
