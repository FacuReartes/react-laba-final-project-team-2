import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

const theme = createTheme();
const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </QueryClientProvider>
);

describe('ResetPasswordForm - Validation and Completion', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    window.location = { search: '?code=validcode' } as unknown as Location;
    (global.fetch as jest.Mock).mockReset();
  });

  const fillForm = (password: string, confirmPassword: string) => {
    fireEvent.change(screen.getByLabelText(/^Password/), {
      target: { value: password },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/), {
      target: { value: confirmPassword },
    });
  };

  const submitForm = () => {
    fireEvent.click(screen.getByRole('button', { name: /Reset password/i }));
  };

  test('shows error for password less than 8 characters', async () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('short', 'short');
    submitForm();

    await waitFor(() => {
      const errorMessages = screen.getAllByText(
        /Password must be at least 8 characters/i
      );
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test('shows error for non-matching passwords', async () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('Password@123', 'Password@456');
    submitForm();

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('successfully resets password with valid input', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('ValidPassword123!', 'ValidPassword123!');
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Password Changed!')).toBeInTheDocument();
    });
  });

  test('shows error for password without uppercase letter', async () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('password123!', '');
    submitForm();

    await waitFor(() => {
      expect(
        screen.getByText(/Password must contain at least one uppercase letter/i)
      ).toBeInTheDocument();
    });
  });

  test('shows error for password without number', async () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('Password!', '');
    submitForm();

    await waitFor(() => {
      expect(
        screen.getByText(/Password must contain at least one number/i)
      ).toBeInTheDocument();
    });
  });

  test('shows error for password without special character', async () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    fillForm('Password123', '');
    submitForm();

    await waitFor(() => {
      expect(
        screen.getByText(
          /Password must contain at least one special character/i
        )
      ).toBeInTheDocument();
    });
  });
});
