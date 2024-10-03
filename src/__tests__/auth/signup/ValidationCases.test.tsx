import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { useRouter } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignupForm from '@/components/auth/signUp/SignupForm';

jest.mock('@/hooks/useRegisterUser', () => ({
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

describe('SignupForm - Validation cases', () => {
  beforeEach(() => {
    (useRegisterUser as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      setOpenDialog: jest.fn(),
      openDialog: false,
      message: '',
      isPending: false,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('renders form fields', () => {
    render(<SignupForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  test('validates empty fields', async () => {
    render(<SignupForm />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();

      const passwordRequiredMessages =
        screen.getAllByText(/Password is required/i);
      expect(passwordRequiredMessages).toHaveLength(2); // One for password, one for confirm password
    });
  });

  test('validates invalid email', async () => {
    render(<SignupForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test('validates password requirements', async () => {
    render(<SignupForm />, { wrapper: Wrapper });

    const testCases = [
      {
        password: 'short',
        expectedError: /Password must be at least 8 characters long/i,
      },
      {
        password: 'lowercase123!',
        expectedError: /Password must contain at least one uppercase letter/i,
      },
      {
        password: 'UPPERCASE123!',
        expectedError: /Password must contain at least one lowercase letter/i,
      },
      {
        password: 'Mixedcase!',
        expectedError: /Password must contain at least one number/i,
      },
      {
        password: 'Mixedcase123',
        expectedError: /Password must contain at least one special character/i,
      },
      {
        password: 'Mixed case 123!',
        expectedError: /Password cannot contain spaces/i,
      },
    ];

    for (const { password, expectedError } of testCases) {
      fireEvent.change(screen.getByLabelText(/^Password/i), {
        target: { value: password },
      });
      fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

      await waitFor(() => {
        const errorMessage = screen.getByText(expectedError);
        expect(errorMessage).toBeInTheDocument();
      });
    }
  });

  test('validates password mismatch', async () => {
    render(<SignupForm />, { wrapper: Wrapper });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'DifferentPass1!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockMutate = jest.fn();
    (useRegisterUser as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      setOpenDialog: jest.fn(),
      openDialog: false,
      message: '',
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
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        username: 'Emilio Pino',
        email: 'emilio.pino@email.com',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
      });
    });
  });
});
