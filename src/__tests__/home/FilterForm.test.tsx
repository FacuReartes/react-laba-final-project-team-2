import { render, screen, fireEvent } from '@testing-library/react';

import { DataType } from '@/lib/definitions';
import { FilterTypes } from '@/hooks/useFilter';
import { FilterForm, SizesType } from '@/components/common/Filter/FilterForm';

const mockBrands: DataType[] = [
  { id: 1, name: 'Brand A', selected: false },
  { id: 2, name: 'Brand B', selected: false },
];

const mockPrices = [0, 100];
const mockSelectedPrice = [20, 80];

const mockColors: DataType[] = [
  { id: 1, name: 'Red', selected: false },
  { id: 2, name: 'Blue', selected: false },
];

const mockCategories: DataType[] = [
  { id: 1, name: 'Sneakers', selected: false },
  { id: 2, name: 'Boots', selected: false },
  { id: 3, name: 'Sandals', selected: false },
  { id: 4, name: 'Formal Shoes', selected: false },
  { id: 5, name: 'Running Shoes', selected: false },
  { id: 6, name: 'Slippers', selected: false },
];

const mockSizes: SizesType[] = [
  { id: 1, value: 32, selected: false },
  { id: 2, value: 34, selected: false },
];

const mockGenders: DataType[] = [
  { id: 1, name: 'Male', selected: false },
  { id: 2, name: 'Female', selected: false },
];

describe('FilterForm', () => {
  const updateFilter = jest.fn();
  const initialFilter: FilterTypes = {
    genders: mockGenders,
    brands: mockBrands,
    prices: mockSelectedPrice,
    colors: mockColors,
    categories: mockCategories,
    sizes: mockSizes,
  };

  beforeEach(() => {
    render(
      <FilterForm
        filterOptions={{
          genders: mockGenders,
          brands: mockBrands,
          prices: mockPrices,
          colors: mockColors,
          categories: mockCategories,
          sizes: mockSizes,
        }}
        initialFilter={initialFilter}
        updateFilter={updateFilter}
      />
    );
  });

  test('renders all filter components', () => {
    expect(screen.getByText('Genders')).toBeInTheDocument();
    expect(screen.getByText('Brands')).toBeInTheDocument();
    expect(screen.getByText('Prices')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sizes')).toBeInTheDocument();
  });

  test('updates gender filter on selection', () => {
    const genderCheckbox = screen.getByLabelText('Male');
    fireEvent.click(genderCheckbox);
    expect(updateFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        genders: expect.arrayContaining([
          expect.objectContaining({ id: 1, selected: true }),
        ]),
      })
    );
  });

  test('updates brand filter on selection', () => {
    const brandCheckbox = screen.getByLabelText('Brand A');
    fireEvent.click(brandCheckbox);
    expect(updateFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        brands: expect.arrayContaining([
          expect.objectContaining({ id: 1, selected: true }),
        ]),
      })
    );
  });

  test('updates color filter on selection', () => {
    const colorCheckbox = screen.getByLabelText('Red');
    fireEvent.click(colorCheckbox);
    expect(updateFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: expect.arrayContaining([
          expect.objectContaining({ id: 1, selected: true }),
        ]),
      })
    );
  });

  test('updates category filter on selection', () => {
    const categoryCheckbox = screen.getByLabelText('Sneakers');
    fireEvent.click(categoryCheckbox);
    expect(updateFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        categories: expect.arrayContaining([
          expect.objectContaining({ id: 1, selected: true }),
        ]),
      })
    );
  });

  test('updates size filter on toggle change', () => {
    const sizeToggle = screen.getByRole('button', { name: '32' });
    fireEvent.click(sizeToggle);
    expect(updateFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        sizes: expect.arrayContaining([
          expect.objectContaining({ id: 1, selected: true }),
        ]),
      })
    );
  });
});
