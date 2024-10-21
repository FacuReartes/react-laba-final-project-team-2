import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import HeaderMenu from '@/components/common/Header/HeaderMenu';
import * as useLogOutModule from '@/hooks/auth/useLogOut';
import { useRouter } from 'next/navigation';
import { useLogOut } from '@/hooks/auth/useLogOut';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  signOut: jest.fn(),
}));

jest.mock('@/hooks/auth/useLogOut', () => ({
  useLogOut: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/common/Popup', () => ({
  __esModule: true,
  default: jest.fn(({ title }) => <div data-testid="popup">{title}</div>),
}));

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

describe('HeaderMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLogOutModule.useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn(),
      isLoading: false,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
  });

  it('calls handleLogOut when "Log out" is clicked', async () => {
    const mockHandleLogOut = jest.fn();
    (useLogOutModule.useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: mockHandleLogOut,
      isLoading: false,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);
    fireEvent.click(screen.getByLabelText('hamburger'));
    fireEvent.click(screen.getByText('Log out'));

    expect(mockHandleLogOut).toHaveBeenCalledTimes(1);
  });

  it('disables logout button when isLoading is true', () => {
    (useLogOutModule.useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn(),
      isLoading: true,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);
    fireEvent.click(screen.getByLabelText('hamburger'));

    const logoutButton = screen.getByText('Log out').closest('li');
    expect(logoutButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays popup with message when openDialog is true', () => {
    const mockMessage = 'Logout successful';
    (useLogOutModule.useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn(),
      isLoading: false,
      openDialog: true,
      setOpenDialog: jest.fn(),
      message: mockMessage,
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);

    expect(screen.getByTestId('popup')).toHaveTextContent(mockMessage);
  });

  it('calls handleLogOut when "Log out" is clicked', async () => {
    const mockHandleLogOut = jest.fn();
    (useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: mockHandleLogOut,
      isLoading: false,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);
    fireEvent.click(screen.getByLabelText('hamburger'));
    fireEvent.click(screen.getByText('Log out'));

    expect(mockHandleLogOut).toHaveBeenCalledTimes(1);
  });

  it('disables logout button when isLoading is true', () => {
    (useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn(),
      isLoading: true,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);
    fireEvent.click(screen.getByLabelText('hamburger'));

    const logoutButton = screen.getByText('Log out').closest('li');
    expect(logoutButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays popup with message when openDialog is true', () => {
    const mockMessage = 'Logout successful';
    (useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn(),
      isLoading: false,
      openDialog: true,
      setOpenDialog: jest.fn(),
      message: mockMessage,
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);

    expect(screen.getByTestId('popup')).toHaveTextContent(mockMessage);
  });

  it('clears session data and redirects to home page upon logging out', async () => {
    const mockSignOut = jest.fn().mockResolvedValue(undefined);
    (signOut as jest.Mock).mockImplementation(mockSignOut);

    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    (useLogOutModule.useLogOut as jest.Mock).mockReturnValue({
      handleLogOut: jest.fn().mockImplementation(() => {
        return signOut({ callbackUrl: '/', redirect: true });
      }),
      isLoading: false,
      openDialog: false,
      setOpenDialog: jest.fn(),
      message: '',
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });

    customRender(<HeaderMenu showInputSearch={false} />);
    fireEvent.click(screen.getByLabelText('hamburger'));
    fireEvent.click(screen.getByText('Log out'));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({
        callbackUrl: '/',
        redirect: true,
      });
    });

    // Verify that the signOut function was called, which would clear the session
    expect(mockSignOut).toHaveBeenCalledTimes(1);

    // Verify that the redirect is handled by next-auth (signOut with redirect: true)
    expect(mockSignOut).toHaveBeenCalledWith(
      expect.objectContaining({ redirect: true })
    );
  });
});
