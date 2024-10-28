import AddProductForm from '@/components/Product/Form/AddProductForm';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
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
      return { data: mockSession };
    }),
  };
});

jest.mock('@/app/api/chat/textGenerator', () => {
  return {
    generateDescription() {
      return 'Mocked AI description'
    }
  }
})

jest.mock('@tanstack/react-query', () => {
  const mockData = [
    {
      id: 1,
      attributes: {
        name: 'property',
        value: 25,
      },
    },
  ];
  return {
    useQueryClient: jest.fn(() => {
      return {
        invalidateQueries: jest.fn(),
      };
    }),
    useMutation: jest.fn(() => {
      return {
        mutate: jest.fn(),
        isSuccess: true,
        reset: jest.fn(),
        isPending: false,
      };
    }),
    useQuery: jest.fn(() => {
      return { data: mockData };
    }),
  };
});

// Clean mocks
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Render component
beforeEach(() => render(<AddProductForm />));

describe('Add product AI tests', () => {

  it('Icon Visibility', () => {
    expect(screen.findByRole('ai-button')).toBeTruthy()
  })
  
  it('User should be able to use hover functionality', () => {
    // Hover over the button
    fireEvent.mouseEnter(screen.getByRole('ai-button'))
    expect(screen.findByText(/Use AI suggestion/i)).toBeTruthy()
  })

  it('User should be able to generate a description with AI', async () => {
    
    fireEvent.input(screen.getByPlaceholderText('Insert product name'), {
      target: {
        value: 'Product Test',
      },
    });

    const descriptionInput: HTMLInputElement = screen.getByPlaceholderText('Do not exceed 300 characters.')

    fireEvent.click(screen.getByRole('ai-button'))
    await waitFor(() => {
      expect(descriptionInput.value).toBe('Mocked AI description')
    })
  })
})