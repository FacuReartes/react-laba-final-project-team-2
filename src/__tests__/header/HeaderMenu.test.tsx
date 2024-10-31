/* eslint-disable @typescript-eslint/no-require-imports */
import HeaderMenu from '@/components/common/Header/HeaderMenu'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
}

describe('Header Menu tests', () => {

  it('Should display menu items when clicking the hamburger icon', async () => {
  
    render(<HeaderMenu showInputSearch={false} />)
  
    resizeWindow(375, 675)
  
    fireEvent.click(screen.getByLabelText('hamburger'))
    
    await waitFor(() => {
      expect(screen.queryByText(/My Products/i)).toBeInTheDocument()
      expect(screen.queryByText(/Order History/i)).toBeInTheDocument()
      expect(screen.queryByText(/My Wishlist/i)).toBeInTheDocument()
      expect(screen.queryByText(/Recently Viewed/i)).toBeInTheDocument()
      expect(screen.queryByText(/Settings/i)).toBeInTheDocument()
      expect(screen.queryByText(/Log Out/i)).toBeInTheDocument()
    })
  })
  
  it('User should be able to interact with all items', async () => {
  
    const push = jest.fn();
  
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  
    render(<HeaderMenu showInputSearch={false} />)
  
    resizeWindow(375, 675)
  
    fireEvent.click(screen.getByLabelText('hamburger'))
  
    await waitFor(() => {
      fireEvent.click(screen.getByText(/My Products/i))
      fireEvent.click(screen.getByText(/Order History/i))
      fireEvent.click(screen.getByText(/My Wishlist/i))
      fireEvent.click(screen.getByText(/Recently viewed/i))
      fireEvent.click(screen.getByText(/Settings/i))
      
      expect(push).toHaveBeenCalledTimes(5)
    })
  
  })
})

describe('Items should be in red if they are in its pathname', () => {

  it('My Products pathname', async () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/products');

    render(<HeaderMenu showInputSearch={false} />)

    resizeWindow(375, 675)

    fireEvent.click(screen.getByLabelText('hamburger'))

    await waitFor(() => {
      expect(screen.queryByAltText(/bag-tick-red/i)).toBeInTheDocument()
    })
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Order History pathname', async () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/order-history');

    render(<HeaderMenu showInputSearch={false} />)

    resizeWindow(375, 675)

    fireEvent.click(screen.getByLabelText('hamburger'))

    await waitFor(() => {
      expect(screen.queryByAltText(/order-history-red/i)).toBeInTheDocument()
    })
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('My Wishlist pathname', async () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/wishlist');
    
    render(<HeaderMenu showInputSearch={false} />)

    resizeWindow(375, 675)

    fireEvent.click(screen.getByLabelText('hamburger'))

    await waitFor(() => {
      expect(screen.queryByAltText(/wishlist-red/i)).toBeInTheDocument()
    })
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Recently viewed pathname', async () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/recently-viewed');
    
    render(<HeaderMenu showInputSearch={false} />)

    resizeWindow(375, 675)

    fireEvent.click(screen.getByLabelText('hamburger'))

    await waitFor(() => {
      expect(screen.queryByAltText(/recently-viewed-red/i)).toBeInTheDocument()
    })
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })

  it('Settings pathname', async () => {
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/profile/settings');
    
    render(<HeaderMenu showInputSearch={false} />)

    resizeWindow(375, 675)

    fireEvent.click(screen.getByLabelText('hamburger'))

    await waitFor(() => {
      expect(screen.queryByAltText(/settings-red/i)).toBeInTheDocument()
    })
    jest.spyOn(require('next/navigation'), 'usePathname').mockRestore();
  })
})