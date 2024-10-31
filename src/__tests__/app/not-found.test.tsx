import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '@/app/not-found';

// Mock the next/image component
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: any) => {
//     return <img {...props} />
//   },
// }))

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the GoBackButton component
jest.mock('@/components/common/GoBackButton', () => {
  return function DummyGoBackButton({ text }: { text: string }) {
    return <button>{text}</button>;
  };
});

// Mock the MUI components
jest.mock('@mui/material', () => ({
  Box: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mui-box">{children}</div>
  ),
  Button: ({
    children,
  }: {
    children: React.ReactNode;
    variant: string;
    sx?: object;
  }) => <button data-testid="mui-button">{children}</button>,
  Typography: ({
    children,
  }: {
    children: React.ReactNode;
    variant?: string;
    sx?: object;
  }) => <span data-testid="mui-typography">{children}</span>,
}));

describe('NotFoundPage', () => {
  it('renders without crashing', () => {
    render(<NotFoundPage />);
  });

  it('displays the correct error message', () => {
    render(<NotFoundPage />);
    expect(screen.getAllByText('Error 404')).toHaveLength(2); // One for mobile, one for desktop
  });

  it('displays the correct paragraph text', () => {
    render(<NotFoundPage />);
    expect(
      screen.getAllByText('The page that youre looking for is missing.')
    ).toHaveLength(2); // One for mobile, one for desktop
  });

  it('renders the 404 image', () => {
    render(<NotFoundPage />);
    const images = screen.getAllByAltText('404-img');
    expect(images).toHaveLength(2); // One for mobile, one for desktop
    expect(images[0]).toHaveAttribute('width', '360');
    expect(images[1]).toHaveAttribute('width', '960');
  });

  it('renders the "Go back" button', () => {
    render(<NotFoundPage />);
    expect(screen.getAllByText('Go back')).toHaveLength(2); // One for mobile, one for desktop
  });

  it('renders the "Home" button', () => {
    render(<NotFoundPage />);
    expect(screen.getAllByText('Home')).toHaveLength(2); // One for mobile, one for desktop
  });

  it('renders the mobile design', () => {
    render(<NotFoundPage />);
    const mobileBox = screen.getAllByTestId('mui-box')[0];
    expect(mobileBox).toBeInTheDocument();
  });

  it('renders the desktop design', () => {
    render(<NotFoundPage />);
    const desktopBox = screen.getAllByTestId('mui-box')[1];
    expect(desktopBox).toBeInTheDocument();
  });
});

// This is a dummy component to make the test file valid
export default function Component() {
  return null;
}
