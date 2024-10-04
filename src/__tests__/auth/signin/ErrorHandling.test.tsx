import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSignIn } from '@/hooks/useSignIn';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignInForm from '@/components/auth/signIn/SignInForm';

jest.mock('@/hooks/useSignIn');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}));

const theme = createTheme();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SignInForm - Error Handling', () => {
  let mockHandleSignIn: jest.Mock;
  let mockCloseDialog: jest.Mock;

  beforeEach(() => {
    mockHandleSignIn = jest.fn();
    mockCloseDialog = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  const renderSignInForm = (errorMessage: string) => {
    (useSignIn as jest.Mock).mockReturnValue({
      handleSignIn: mockHandleSignIn.mockRejectedValue(new Error(errorMessage)),
      openDialog: true,
      closeDialog: mockCloseDialog,
      message: errorMessage,
      isLoading: false,
    });

    render(<SignInForm />, { wrapper: Wrapper });
  };

  const submitForm = async () => {
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('action-button'));
  };

  test('shows error for incorrect email/password', async () => {
    renderSignInForm('Invalid identifier or password');
    await submitForm();

    await waitFor(() => {
      expect(screen.getByText('Sign in error')).toBeInTheDocument();
      expect(
        screen.getByText('Invalid identifier or password')
      ).toBeInTheDocument();
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });
  });

  test('shows error for unconfirmed email address', async () => {
    renderSignInForm('Your account email is not confirmed');
    await submitForm();

    await waitFor(() => {
      expect(screen.getByText('Sign in error')).toBeInTheDocument();
      expect(
        screen.getByText('Your account email is not confirmed')
      ).toBeInTheDocument();
      expect(screen.getByText('Ok')).toBeInTheDocument();
    });
  });
});
