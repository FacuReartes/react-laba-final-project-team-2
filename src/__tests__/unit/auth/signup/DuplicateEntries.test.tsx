import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser';
import SignupForm from '@/components/auth/SignupForm';

jest.mock('@/hooks/auth/useRegisterUser', () => ({
  useRegisterUser: jest.fn(),
}));

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

describe('SignupForm - Duplicate Entries', () => {
  const mockSetOpenDialog = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('handles duplicate email address', async () => {
    const errorMessage = 'Email or Username are already taken';
    const mockMutate = jest.fn().mockImplementation(() => {
      mockSetOpenDialog(true);
    });

    (useRegisterUser as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      setOpenDialog: mockSetOpenDialog,
      openDialog: true, // Set to true to simulate the dialog being open
      message: errorMessage,
      isPending: false,
    });

    render(<SignupForm />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Emilio Pino' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'emilio.pino@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'StrongPass1!' },
    });

    const submitButton = screen.getByTestId('action-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        username: 'Emilio Pino',
        email: 'emilio.pino@email.com',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
      });
    });

    // Check if the AuthPopup is displayed with the correct error message
    expect(mockSetOpenDialog).toHaveBeenCalledWith(true);
    expect(
      screen.getByText('Email or Username are already taken')
    ).toBeInTheDocument();

    expect(screen.getByText(/Try again/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to sign in/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Try again/i));
    fireEvent.click(screen.getByText(/Go to sign in/i));
  });
});
