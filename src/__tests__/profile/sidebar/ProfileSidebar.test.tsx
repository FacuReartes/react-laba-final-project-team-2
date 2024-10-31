/* eslint-disable @typescript-eslint/no-require-imports */
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import { screen, render, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname() {
    return '/'
  }
}));

jest.mock('next-auth/react', () => {
  const mockSession = {
    user: {
      jwt: 'jwtcode',
      user: {
        id: 1,
      },
    },
  };
  return {
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

jest.mock('@tanstack/react-query', () => {
  const mockData = [
    {
      firstName: 'test name',
      lastName: 'test lastname',
      username: 'test username',
      avatar: {
        url: '/no-url'
      }
    },
  ];
  return {
    useQuery: jest.fn(() => {
      return { data: mockData };
    }),
  };
});

describe('Profile Sidebar tests', () => {

  it('User should be able to see all items', () => {

    render(<ProfileSidebar/>)

    expect(screen.queryByText(/My Products/i)).toBeInTheDocument()
    expect(screen.queryByText(/Order History/i)).toBeInTheDocument()
    expect(screen.queryByText(/My Wishlist/i)).toBeInTheDocument()
    expect(screen.queryByText(/Recently viewed/i)).toBeInTheDocument()
    expect(screen.queryByText(/Settings/i)).toBeInTheDocument()
    expect(screen.queryByText(/Log out/i)).toBeInTheDocument()

  })

  it('User should be able to interact with all items', () => {

    const push = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(<ProfileSidebar/>)

    fireEvent.click(screen.getByText(/My Products/i))
    fireEvent.click(screen.getByText(/Order History/i))
    fireEvent.click(screen.getByText(/My Wishlist/i))
    fireEvent.click(screen.getByText(/Recently viewed/i))
    fireEvent.click(screen.getByText(/Settings/i))

    expect(push).toHaveBeenCalledTimes(5)
  })


})

describe('Items should be in red if they are in its pathname', () => {

  it('My Products pathname', () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/products');
    render(<ProfileSidebar/>)
    expect(screen.queryByAltText(/bag-tick-red/i)).toBeInTheDocument()
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Order History pathname', () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/order-history');
    render(<ProfileSidebar/>)
    expect(screen.queryByAltText(/order-history-red/i)).toBeInTheDocument()
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('My Wishlist pathname', () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/wishlist');
    render(<ProfileSidebar/>)
    expect(screen.queryByAltText(/wishlist-red/i)).toBeInTheDocument()
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Recently viewed pathname', () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/recently-viewed');
    render(<ProfileSidebar/>)
    expect(screen.queryByAltText(/recently-viewed-red/i)).toBeInTheDocument()
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Settings pathname', () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/settings');
    render(<ProfileSidebar/>)
    expect(screen.queryByAltText(/settings-red/i)).toBeInTheDocument()
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

})