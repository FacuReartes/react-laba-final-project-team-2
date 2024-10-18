import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser';
import SignupForm from '@/components/auth/SignupForm';

jest.mock('@/hooks/useRegisterUser');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignupForm - UI Interactions', () => {
  it('redirects to sign-in page when the "Ok" button is clicked after successful signup', async () => {
    const mockPush = jest.fn();
    const mockSetOpenDialog = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock useRegisterUser to simulate a successful signup
    (useRegisterUser as jest.Mock).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mutate: jest.fn(data => {
        mockSetOpenDialog(true); // Simulate popup opening
      }),
      setOpenDialog: mockSetOpenDialog,
      openDialog: true,
      message:
        'User registered successfully. Confirm your email address and then login',
      isPending: false,
    });

    render(<SignupForm />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'StrongPass1!' },
    });

    // Find the form submit button by its test ID and click it
    fireEvent.click(screen.getByTestId('action-button'));

    // Wait for the popup to appear
    await waitFor(() => {
      expect(mockSetOpenDialog).toHaveBeenCalledWith(true);
      expect(
        screen.getByText(/User registered successfully/i)
      ).toBeInTheDocument();
    });

    // Click the "Ok" button in the popup
    fireEvent.click(screen.getByText(/Ok/i));

    // Verify the router redirects to the sign-in page
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/sign-in');
    });
  });
});
