import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Importing the useRouter
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}));

const theme = createTheme();

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush, // Mock the router push function
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ForgotPasswordForm - Validation cases', () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  test('renders email field', () => {
    render(<ForgotPasswordForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/Email \*/i)).toBeInTheDocument();
  });

  test('validates empty email field', async () => {
    render(<ForgotPasswordForm />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /Reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  test('validates invalid email format', async () => {
    render(<ForgotPasswordForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/Email \*/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid email', async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<ForgotPasswordForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/Email \*/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Reset password/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith('user@example.com');
    });
  });
});
