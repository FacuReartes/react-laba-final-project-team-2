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

describe('ResetPasswordForm', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock window.location
    window.location = { search: '?code=validcode' } as unknown as Location;

    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
  });

  const fillFormAndSubmit = async () => {
    fireEvent.change(screen.getByLabelText(/^Password/), {
      target: { value: 'NewPassword123!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/), {
      target: { value: 'NewPassword123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Reset password/i }));
  };

  test('displays success message for valid reset link', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<ResetPasswordForm />, { wrapper: Wrapper });

    await fillFormAndSubmit();

    await waitFor(() => {
      expect(screen.getByText('Password Changed!')).toBeInTheDocument();
    });
  });

  test('displays error message for expired reset link', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Reset password token is invalid or has expired')
    );

    render(<ResetPasswordForm />, { wrapper: Wrapper });

    await fillFormAndSubmit();

    await waitFor(() => {
      expect(screen.getByText('Password Reset Fail')).toBeInTheDocument();
    });
  });

  test('redirects to sign-in page when "Back to Login" is clicked after error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Reset password token is invalid or has expired')
    );

    render(<ResetPasswordForm />, { wrapper: Wrapper });

    await fillFormAndSubmit();

    await waitFor(() => {
      expect(screen.getByText('Password Reset Fail')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Back to Login/i }));

    expect(mockRouter.push).toHaveBeenCalledWith('/auth/sign-in');
  });
});
