import { render, screen } from '@testing-library/react';
import SignupForm from '@/components/auth/signUp/SignupForm';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => true,
}));

jest.mock('@/hooks/useRegisterUser', () => ({
  useRegisterUser: () => ({
    mutate: jest.fn(),
    setOpenDialog: jest.fn(),
    openDialog: false,
    message: '',
    isPending: false,
  }),
}));

jest.mock('@/hooks/useShowPassword', () => ({
  useShowPassword: () => ({
    handleClickShowPassword: jest.fn(),
    handleClickShowConfirmPassword: jest.fn(),
    showPassword: false,
    showConfirmPassword: false,
  }),
}));

jest.mock('@/lib/authOptions', () => ({
  useSignupForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  }),
}));

describe('SignupForm', () => {
  it('should render title', () => {
    render(<SignupForm />);
    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });
});
