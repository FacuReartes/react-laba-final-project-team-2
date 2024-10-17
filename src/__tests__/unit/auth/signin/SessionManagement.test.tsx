import SignInForm from '@/components/auth/SignInForm';
import { render, act } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useSignIn', () => ({
  useSignIn: jest.fn().mockReturnValue({
    handleSignIn: jest.fn(),
    openDialog: false,
    closeDialog: jest.fn(),
    message: '',
    isLoading: false,
  }),
}));

jest.mock('@/lib/schemas/authSchemas', () => ({
  useSignInForm: jest.fn().mockReturnValue({
    register: jest.fn(),
    handleSubmit: jest.fn(cb => cb),
    formState: { errors: {} },
  }),
}));

describe('Session Persistence', () => {
  let mockRouter;
  let mockSignIn: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockSignIn = signIn as jest.Mock;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should persist session when Remember Me is checked', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    mockSignIn.mockResolvedValue({ ok: true, error: null });

    render(<SignInForm />);

    await act(async () => {
      await mockSignIn('credentials', {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });
    });

    // Fast-forward time by 29 days
    act(() => {
      jest.advanceTimersByTime(29 * 24 * 60 * 60 * 1000);
    });

    // Session should still be valid
    expect(useSession().status).toBe('authenticated');
  });

  it('should expire session when Remember Me is not checked', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    mockSignIn.mockResolvedValue({ ok: true, error: null });

    render(<SignInForm />);

    await act(async () => {
      await mockSignIn('credentials', {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });
    });

    // Fast-forward time by 1 day
    act(() => {
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    });

    // Session should have expired
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    expect(useSession().status).toBe('unauthenticated');
  });
});
