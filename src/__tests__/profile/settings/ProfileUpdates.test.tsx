import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { useDeleteAvatar } from '@/hooks/useDeleteAvatar';
import SettingsForm from '@/components/settings/SettingsForm';

// Mock the hooks and modules
jest.mock('next-auth/react');
jest.mock('@tanstack/react-query');
jest.mock('@/hooks/useUpdateUser');
jest.mock('@/hooks/useUploadAvatar');
jest.mock('@/hooks/useDeleteAvatar');
jest.mock('@/hooks/useUserQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
  useTheme: jest.fn().mockReturnValue({
    breakpoints: { down: jest.fn(), between: jest.fn(), up: jest.fn() },
  }),
}));

describe('SettingsForm', () => {
  let mockUpdateUser: jest.Mock<any, any, any>;

  beforeEach(() => {
    // Mock the session
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { jwt: 'mock-jwt' } },
      status: 'authenticated',
    });

    // Mock the user data
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '(949) 354-2574',
        avatar: { id: 'avatar-id', url: 'http://example.com/avatar.jpg' },
      },
      isPending: false,
    });

    mockUpdateUser = jest.fn();
    // Mock the update user hook
    (useUpdateUser as jest.Mock).mockReturnValue({
      mutate: mockUpdateUser,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });

    // Mock the upload avatar hook
    (useUploadAvatar as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      avatarData: null,
      setOpenDialog: jest.fn(),
      message: '',
      openDialog: false,
      isPending: false,
    });

    // Mock the delete avatar hook
    (useDeleteAvatar as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      openDialog: false,
      message: '',
      isPending: false,
      setOpenDialog: jest.fn(),
    });
  });

  test('updates user information correctly', async () => {
    render(<SettingsForm />);

    // Wait for the component to fully render and populate fields
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Name')).toHaveValue('John');
      expect(screen.getByPlaceholderText('Surname')).toHaveValue('Doe');
      expect(screen.getByPlaceholderText('example@mail.com')).toHaveValue(
        'john@example.com'
      );
      expect(screen.getByPlaceholderText('(949) 354-2574')).toHaveValue(
        '(949) 354-2574'
      );
    });

    // Change form fields
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText('Surname'), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText('(949) 354-2574'), {
      target: { value: '(123) 456-7890' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save changes'));

    // Wait for the updateUser function to be called
    await waitFor(
      () => {
        expect(mockUpdateUser).toHaveBeenCalledWith({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'john@example.com',
          phoneNumber: '(123) 456-7890',
        });
      },
      { timeout: 3000 }
    );
  });

  test('renders SettingsForm component', () => {
    render(<SettingsForm />);
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Surname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@mail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('(949) 354-2574')).toBeInTheDocument();
  });

  test('validates phone number format', async () => {
    render(<SettingsForm />);

    fireEvent.change(screen.getByPlaceholderText('(949) 354-2574'), {
      target: { value: 'invalid-phone' },
    });
    fireEvent.click(screen.getByText('Save changes'));

    await waitFor(() => {
      expect(
        screen.getByText('Phone number must be in the format: (949) 354-2574')
      ).toBeInTheDocument();
    });
  });

  test('enables save button when changes are made', () => {
    render(<SettingsForm />);
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Jane' },
    });
    expect(screen.getByText('Save changes')).toBeEnabled();
  });
});
