import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '@/components/profile/ProductCard';
import { ProductType } from '@/lib/definitions';

// Mock the Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the hooks
jest.mock('@/hooks/common/useOutsideClick', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/hooks/products/useEditProduct', () => ({
  useEditProduct: jest.fn(),
}));

jest.mock('@/hooks/products/useDuplicateProduct', () => ({
  useDuplicateProduct: jest.fn(),
}));

describe('ProductCard', () => {
  const mockProduct: ProductType = {
    id: 1,
    attributes: {
      name: 'Test Product',
      price: 99.99,
      description: 'This is a test product',
      brand: { data: { id: 1, attributes: { name: 'Test Brand' } } },
      teamName: 'team-1',
      gender: { data: { id: 1, attributes: { name: 'Men' } } },
      sizes: { data: [{ id: 1, attributes: { value: 10 } }] },
      color: { data: { id: 1, attributes: { name: 'Red' } } },
      categories: { data: [{ id: 1, attributes: { name: 'Shoes' } }] },
      images: {
        data: [
          {
            attributes: {
              url: '/test-image.jpg',
            },
          },
        ],
      },
    },
  };

  it('renders the product card correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText("Men's Shoes")).toBeInTheDocument();
  });

  it('shows the Duplicate button when three dots are clicked', () => {
    render(<ProductCard product={mockProduct} />);

    // Click the three dots button
    const threeDotsButton = screen.getByText('...');
    fireEvent.click(threeDotsButton);

    // Check if the Duplicate button is visible
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
  });
});
