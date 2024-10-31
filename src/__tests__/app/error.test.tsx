import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorComponent from '@/app/error';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
}));

// Mock the GoBackButton component
jest.mock('@/components/common/GoBackButton', () => {
  return function DummyGoBackButton({ text }: { text: string }) {
    return <button>{text}</button>;
  };
});

describe('Error Component', () => {
  const mockError = new Error('Test error');

  beforeEach(() => {
    // Mock console.error before each test
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('renders the error message', () => {
    render(<ErrorComponent error={mockError} />);
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('renders the SickIcon', () => {
    render(<ErrorComponent error={mockError} />);
    const icon = screen.getByTestId('SickIcon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the GoBackButton with correct text', () => {
    render(<ErrorComponent error={mockError} />);
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('logs the error to console', () => {
    render(<ErrorComponent error={mockError} />);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it('applies correct styles to the container', () => {
    const { container } = render(<ErrorComponent error={mockError} />);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    });
    // Note: We can't easily test the background gradient in JSDOM
  });
});

// This is a dummy component to make the test file valid
export default function Component() {
  return null;
}
