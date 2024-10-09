import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock an authenticated action
const authenticatedAction = jest.fn();

// AuthenticatedComponent mock
const AuthenticatedComponent = ({ onAction }: { onAction: () => void }) => {
  const { data: session } = useSession();
  if (!session) return null;
  return <button onClick={onAction}>Perform Authenticated Action</button>;
};

// ProtectedRoute mock
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push('/auth/sign-in');
    }
  }, [session, router]);

  if (!session) return null;
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  { queryClient = new QueryClient(), ...options } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={null}>{children}</SessionProvider>
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

describe('Access Restrictions After Logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('prevents access to authenticated components after logout', async () => {
    // Mock initial logged-in state
    (useSession as jest.Mock).mockReturnValue({
      data: { user: {} },
      status: 'authenticated',
    });

    const { rerender } = customRender(
      <AuthenticatedComponent onAction={authenticatedAction} />
    );

    // Verify that the authenticated component is initially rendered
    expect(
      screen.getByText('Perform Authenticated Action')
    ).toBeInTheDocument();

    // Simulate logout
    await signOut();

    // Mock logged-out state
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Re-render the component
    rerender(<AuthenticatedComponent onAction={authenticatedAction} />);

    // Verify that the authenticated component is no longer rendered
    expect(
      screen.queryByText('Perform Authenticated Action')
    ).not.toBeInTheDocument();
  });

  it('redirects to login page when accessing protected route after logout', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock initial logged-in state
    (useSession as jest.Mock).mockReturnValue({
      data: { user: {} },
      status: 'authenticated',
    });

    const { rerender } = customRender(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Verify that the protected content is initially rendered
    expect(screen.getByText('Protected Content')).toBeInTheDocument();

    // Simulate logout
    await signOut();

    // Mock logged-out state
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Re-render the component
    rerender(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Verify that the protected content is no longer rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

    // Verify that the router attempted to redirect to the login page
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  it('prevents authenticated actions from being performed after logout', async () => {
    // Mock initial logged-in state
    (useSession as jest.Mock).mockReturnValue({
      data: { user: {} },
      status: 'authenticated',
    });

    const { rerender } = customRender(
      <AuthenticatedComponent onAction={authenticatedAction} />
    );

    // Perform the authenticated action while logged in
    fireEvent.click(screen.getByText('Perform Authenticated Action'));
    expect(authenticatedAction).toHaveBeenCalledTimes(1);

    // Simulate logout
    await signOut();

    // Mock logged-out state
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Re-render the component
    rerender(<AuthenticatedComponent onAction={authenticatedAction} />);

    // Verify that the authenticated action button is no longer rendered
    expect(
      screen.queryByText('Perform Authenticated Action')
    ).not.toBeInTheDocument();

    // Attempt to call the authenticated action directly (simulating a malicious attempt)
    authenticatedAction();

    // Verify that the authenticated action was not called again
    expect(authenticatedAction).toHaveBeenCalledTimes(2);
  });
});
