import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignInForm from '@/components/auth/signIn/SignInForm';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/hooks/useSignIn';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useSignIn', () => ({
  useSignIn: jest.fn(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

const theme = createTheme();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SignInForm - Links and Checkbox', () => {
  let mockPush: jest.Mock;
  let mockHandleSignIn: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockHandleSignIn = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSignIn as jest.Mock).mockReturnValue({
      handleSignIn: mockHandleSignIn,
      openDialog: false,
      closeDialog: jest.fn(),
      message: '',
      isLoading: false,
    });
  });

  test('renders Forgot Password link', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  test('Forgot Password link has correct text', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toHaveTextContent('Forgot password?');
  });

  test('renders Sign Up link', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const signUpLink = screen.getByText('Sign up');
    expect(signUpLink).toBeInTheDocument();
  });

  test('Sign Up link has correct text', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const signUpLink = screen.getByText('Sign up');
    expect(signUpLink).toHaveTextContent('Sign up');
  });

  test('renders Remember Me checkbox', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    expect(rememberMeCheckbox).toBeInTheDocument();
  });

  test('Remember Me checkbox can be toggled', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    const rememberMeCheckbox = screen.getByLabelText(
      'Remember me'
    ) as HTMLInputElement;
    expect(rememberMeCheckbox.checked).toBe(false);
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });
});
