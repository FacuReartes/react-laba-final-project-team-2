import ProductUpdateForm from '@/components/Product/Form/ProductUpdateForm';
import { ProductType } from '@/lib/definitions';
import { UseMutationResult } from '@tanstack/react-query';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

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
    useQuery: jest.fn(() => {
      return { data: mockData };
    }),
  };
});


const productMock: ProductType = {
  id: 1,
  attributes: {
    name: 'Product Test',
    price: 99.99,
    description: 'Product Test Description',
    brand: { data: { id: 1, attributes: { name: 'Test Brand' } } },
    teamName: 'team-2',
    gender: { data: { id: 1, attributes: { name: 'Men' } } },
    sizes: { data: [{ id: 1, attributes: { value: 10 } }] },
    color: { data: { id: 1, attributes: { name: 'Red' } } },
    categories: { data: [{ id: 1, attributes: { name: 'Shoes' } }] },
    images: {
      data: [
        {
          attributes: {
            url: '/test-image.jpg',
          },
        },
      ],
    },
  },
};

// Clean mocks
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Render component
beforeEach(() => render(
  <ProductUpdateForm 
    title="test"
    open={true}
    onClose={jest.fn()}
    useUpdateHook={jest.fn(() => ({
      mutate: jest.fn(),
      isPending: false,
      isSuccess: false,
    } as unknown as UseMutationResult<void, Error, unknown>))} 
    product={productMock}
  />
));
  
describe('Product update AI tests', () => {
    
  it('Icon Visibility', () => {
    expect(screen.findByRole('ai-button')).toBeTruthy()
  })
  
  it('User should be able to use hover functionality', () => {
      // Hover over the button
    fireEvent.mouseEnter(screen.getByRole('ai-button'))
    expect(screen.findByText(/Use AI suggestion/i)).toBeTruthy()
  })

  it('User should be able to generate a description with AI', async () => {

    const descriptionInput: HTMLInputElement = screen.getByText('Product Test Description')

    fireEvent.click(screen.getByRole('ai-button'))
    await waitFor(() => {
      expect(descriptionInput.value).toBe('Mocked AI description')
    })
  })
  
})