import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSignIn } from '@/hooks/auth/useSignIn';
import SignInForm from '@/components/auth/SignInForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/auth/useSignIn', () => ({
  useSignIn: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}));

const theme = createTheme();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SignInForm - Validation cases', () => {
  beforeEach(() => {
    (useSignIn as jest.Mock).mockReturnValue({
      handleSignIn: jest.fn(),
      openDialog: false,
      closeDialog: jest.fn(),
      message: '',
      isLoading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('renders form fields', () => {
    render(<SignInForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
  });

  test('validates empty fields', async () => {
    render(<SignInForm />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('validates invalid email', async () => {
    render(<SignInForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test('validates password requirements', async () => {
    render(<SignInForm />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockHandleSignIn = jest.fn();
    (useSignIn as jest.Mock).mockReturnValue({
      handleSignIn: mockHandleSignIn,
      openDialog: false,
      closeDialog: jest.fn(),
      message: '',
      isLoading: false,
    });

    render(<SignInForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'ValidPass1!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockHandleSignIn).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'ValidPass1!',
        rememberMe: false,
      });
    });
  });
});
