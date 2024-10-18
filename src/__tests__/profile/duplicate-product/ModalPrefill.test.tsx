import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// Mock the ProductUpdateForm component
jest.mock('@/components/Product/Form/ProductUpdateForm', () => {
  return {
    __esModule: true,
    default: ({ product, open, title }: any) =>
      open ? (
        <div data-testid="mock-product-update-form">
          <h2>{title}</h2>
          <p>Product Name: {product.attributes.name}</p>
          <p>Product Price: {product.attributes.price}</p>
        </div>
      ) : null,
  };
});

describe('ProductCard - Duplicate Modal Prefill', () => {
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

  it('pre-fills the duplicate modal with correct product data', async () => {
    render(<ProductCard product={mockProduct} />);

    // Click the three dots button
    const threeDotsButton = screen.getByText('...');
    fireEvent.click(threeDotsButton);

    // Click the Duplicate button
    const duplicateButton = screen.getByText('Duplicate');
    fireEvent.click(duplicateButton);

    // Wait for the modal to appear
    await waitFor(() => {
      const modalTitle = screen.getByText('Duplicate Product');
      expect(modalTitle).toBeInTheDocument();
    });

    // Check if the product data is pre-filled
    expect(
      screen.getByText(`Product Name: ${mockProduct.attributes.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Product Price: ${mockProduct.attributes.price}`)
    ).toBeInTheDocument();
  });
});
