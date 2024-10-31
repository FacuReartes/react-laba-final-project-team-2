import HeaderBar from "@/components/common/Header/HeaderBar"
import { CartContext } from "@/context/cart/CartContext";
import { fireEvent, render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname() {
    return '/cart'
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

const renderWithContext = (ui: ReactNode) => {
  return render(
    <CartContext.Provider
      value={{
        cartList: [],
        setCartList: jest.fn(),
        handleAddToCart: jest.fn(),
        handleQuantity: jest.fn(),
        handleDelete: jest.fn(),
        loading: false,
      }}
    >
      {ui}
    </CartContext.Provider>
  );
};

afterEach(() => jest.clearAllMocks())

describe('Header tests', () => {

  it('User should be able to see sign in button if not logged in', () => {

    (useSession as jest.Mock).mockImplementation(() => ({ data: null }));

    renderWithContext(<HeaderBar 
      setSearchTerm={jest.fn()}
      setOpenResults={jest.fn()}
      setEnterKeyPress={jest.fn()}
      search=''/>
    )

    expect(screen.queryByText(/Sign in/i)).toBeInTheDocument()
    
  })

  it('Should display title based on path', () => {

    renderWithContext(<HeaderBar 
      setSearchTerm={jest.fn()}
      setOpenResults={jest.fn()}
      setEnterKeyPress={jest.fn()}
      search=''/>
    )
    
    expect(screen.queryByText(/Cart/i)).toBeInTheDocument()

  })
})