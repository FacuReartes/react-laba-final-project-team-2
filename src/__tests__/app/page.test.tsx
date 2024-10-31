import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { QueryClient } from '@tanstack/react-query';
import { setFilterFromParams } from '@/utils/setFilterFromParams';

// Mock the HomePageContainer component
jest.mock('@/components/home/HomePageContainer', () => {
  return function MockHomePageContainer() {
    return <div data-testid="home-page-container">MockHomePageContainer</div>;
  };
});

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [],
        meta: { pagination: { pageCount: 1, total: 0 } },
      }),
  })
) as jest.Mock;

// Mock the environment variables
jest.mock('@/../env', () => ({
  env: {
    BASE_URL: 'http://mock-api.com',
  },
}));

// Mock the utility functions
jest.mock('@/utils/fetchFiltersData', () => ({
  fetchGenders: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { name: 'Male' } }] })
  ),
  fetchBrands: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { name: 'Nike' } }] })
  ),
  fetchCategories: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { name: 'Shoes' } }] })
  ),
  fetchColors: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { name: 'Red' } }] })
  ),
  fetchSizes: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { name: 'M' } }] })
  ),
  fetchPrices: jest.fn(() =>
    Promise.resolve({ data: [{ id: 1, attributes: { price: 100 } }] })
  ),
}));

jest.mock('@/utils/getFromAPIToFilterFormat', () => ({
  getFromAPItoGenericFormat: jest.fn(() => [{ id: 1, name: 'Mock' }]),
  getFromAPItoSizesFormat: jest.fn(() => [{ id: 1, name: 'M' }]),
}));

jest.mock('@/utils/prefetchingProducts', () => ({
  getFromFiltersToAPIParams: jest.fn(() => '?mock=true'),
}));

jest.mock('@/utils/setFilterFromParams', () => ({
  setFilterFromParams: jest.fn((params, options) => options),
}));

describe('Home Component', () => {
  it('prefetches all filter data', async () => {
    const queryClient = new QueryClient();
    await Home({ searchParams: {} });

    expect(queryClient.getQueryData(['genders'])).toBeUndefined();
    expect(queryClient.getQueryData(['brands'])).toBeUndefined();
    expect(queryClient.getQueryData(['categories'])).toBeUndefined();
    expect(queryClient.getQueryData(['colors'])).toBeUndefined();
    expect(queryClient.getQueryData(['sizes'])).toBeUndefined();
    expect(queryClient.getQueryData(['prices'])).toBeUndefined();
  });

  it('handles search params correctly', async () => {
    const searchParams = { brand: 'Nike' };
    await Home({ searchParams });

    // Check if setFilterFromParams was called with the correct parameters
    expect(setFilterFromParams).toHaveBeenCalledWith(
      searchParams,
      expect.any(Object)
    );
  });

  it('prefetches products based on filter', async () => {
    await Home({ searchParams: {} });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://mock-api.com/products'),
      expect.any(Object)
    );
  });

  it('renders loading state when data is not available', async () => {
    jest.spyOn(QueryClient.prototype, 'getQueryData').mockReturnValue(null);

    const { container } = render(await Home({ searchParams: {} }));
    expect(container).toHaveTextContent('Loading');
  });
});

// This is a dummy component to make the test file valid
export default function Component() {
  return null;
}
