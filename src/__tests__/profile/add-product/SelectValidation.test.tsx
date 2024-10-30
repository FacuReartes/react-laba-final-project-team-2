import ProductCategorySelect from '@/components/Product/Form/ProductCategorySelect';
import ProductSelect from '@/components/Product/Form/ProductSelect';
import { useAddProductForm } from '@/lib/schemas/addProductSchemas';
import { useQuery } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';

const mockCategories = [
  {
    id: 5,
    attributes: {
      name: 'Casual',
    },
  },
  {
    id: 6,
    attributes: {
      name: 'Running',
    },
  },
  {
    id: 4,
    attributes: {
      name: 'Volleyball',
    },
  },
  {
    id: 7,
    attributes: {
      name: 'Tennis',
    },
  },
  {
    id: 8,
    attributes: {
      name: 'Athletic',
    },
  },
  {
    id: 9,
    attributes: {
      name: 'Boots',
    },
  },
  {
    id: 10,
    attributes: {
      name: 'Tracking',
    },
  },
];

const mockBrands = [
  {
    id: 9,
    attributes: {
      name: 'Nike',
    },
  },
  {
    id: 10,
    attributes: {
      name: 'Adidas',
    },
  },
  {
    id: 11,
    attributes: {
      name: 'Asics',
    },
  },
  {
    id: 12,
    attributes: {
      name: 'Puma',
    },
  },
  {
    id: 13,
    attributes: {
      name: 'New Balance',
    },
  },
];

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Category select dropdown', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockCategories,
    }));

    const { result } = renderHook(() => useAddProductForm());
    const methods = result.current;

    render(
      <FormProvider {...methods}>
        <ProductCategorySelect />
      </FormProvider>
    );
  });

  it('Should be able to select multiple categories', async () => {
    // Click to open dropdown
    const select = screen.getByRole('combobox', { hidden: true });
    fireEvent.mouseDown(select);

    // Click on option running and tennis (casual is there by default)
    const runningOption = await screen.findByTestId('category-option-6');
    const TennisOption = await screen.findByTestId('category-option-7');
    fireEvent.click(runningOption);
    fireEvent.click(TennisOption);

    expect(select).toHaveTextContent(/Running/i);
    expect(select).toHaveTextContent(/Casual/i);
    expect(select).toHaveTextContent(/Tennis/i);
  });

  it('Should display all available categories', async () => {
    // Click to open dropdown
    const select = screen.getByRole('combobox', { hidden: true });
    fireEvent.mouseDown(select);

    // Check if all options are available
    const options = await screen.findAllByRole('option');

    expect(options[0]).toHaveTextContent(/Casual/i);
    expect(options[1]).toHaveTextContent(/Running/i);
    expect(options[2]).toHaveTextContent(/Volleyball/i);
    expect(options[3]).toHaveTextContent(/Tennis/i);
    expect(options[4]).toHaveTextContent(/Athletic/i);
    expect(options[5]).toHaveTextContent(/Boots/i);
    expect(options[6]).toHaveTextContent(/Tracking/i);
  });
});

describe('Product select dropdown', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockBrands,
    }));

    const { result } = renderHook(() => useAddProductForm());
    const methods = result.current;

    render(
      <FormProvider {...methods}>
        <ProductSelect queryObj={{ queryFn: jest.fn(), queryKey: ['brand'] }} />
      </FormProvider>
    );
  });

  it('Should display all available brands', async () => {
    // Click to open dropdown
    const select = screen.getByRole('combobox', { hidden: true });
    fireEvent.mouseDown(select);

    // Check if all options are available
    const options = await screen.findAllByRole('option');

    expect(options[0]).toHaveTextContent(/Nike/i);
    expect(options[1]).toHaveTextContent(/Adidas/i);
    expect(options[2]).toHaveTextContent(/Asics/i);
    expect(options[3]).toHaveTextContent(/Puma/i);
    expect(options[4]).toHaveTextContent(/New Balance/i);
  });
});
