import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock the imported components and modules
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-class',
  }),
  Work_Sans: () => ({
    className: 'mocked-worksans-class',
    style: {
      fontFamily: 'Work Sans, sans-serif',
    },
  }),
}));

jest.mock('@/theme/theme', () => ({
  __esModule: true,
  default: {
    typography: {
      fontFamily: 'Work Sans, sans-serif',
    },
  },
}));

jest.mock('@mui/material-nextjs/v13-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-router-cache-provider">{children}</div>
  ),
}));

jest.mock('@mui/material', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

jest.mock('@/provider/ReactQueryProvider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="react-query-provider">{children}</div>
  ),
}));

jest.mock('@/components/auth/SessionWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-wrapper">{children}</div>
  ),
}));

jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}));

jest.mock('@/context/cart/CartContext', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-provider">{children}</div>
  ),
}));

jest.mock('@/context/wishlist/WishListContext', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wishlist-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders without crashing', () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
  });

  it('applies the Inter font class to the body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(container.querySelector('body')).toHaveClass('mocked-inter-class');
  });

  it('renders all provider components', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(getByTestId('session-wrapper')).toBeInTheDocument();
    expect(getByTestId('react-query-provider')).toBeInTheDocument();
    expect(getByTestId('app-router-cache-provider')).toBeInTheDocument();
    expect(getByTestId('theme-provider')).toBeInTheDocument();
    expect(getByTestId('cart-provider')).toBeInTheDocument();
    expect(getByTestId('wishlist-provider')).toBeInTheDocument();
  });

  it('renders ReactQueryDevtools', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(getByTestId('react-query-devtools')).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('sets correct lang attribute on html tag', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
  });
});

// This is a dummy component to make the test file valid
export default function Component() {
  return null;
}
