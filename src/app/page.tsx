import HomePageContainer from '@/components/home/HomePageContainer';
import {
  Brands,
  Category,
  Color,
  Gender,
  Prices,
  Sizes,
} from '@/lib/definitions';
import {
  fetchBrands,
  fetchCategories,
  fetchColors,
  fetchGenders,
  fetchPrices,
  fetchSizes,
} from '@/utils/fetchFiltersData';
import {
  getFromAPItoGenericFormat,
  getFromAPItoSizesFormat,
} from '@/utils/getFromAPIToFilterFormat';
import { getQueryClient } from '@/utils/getQueryClient';
import {
  fetchFilteredProducts,
  getFromFiltersToAPIParams,
} from '@/utils/prefetchingProducts';
import { setFilterFromParams } from '@/utils/setFilterFromParams';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface HomeProps {
  searchParams: Record<string, string | string[]>;
}

export default async function Home({ searchParams }: HomeProps) {
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['genders'],
      queryFn: fetchGenders,
    });

    await queryClient.prefetchQuery({
      queryKey: ['brands'],
      queryFn: fetchBrands,
    });

    await queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });

    await queryClient.prefetchQuery({
      queryKey: ['colors'],
      queryFn: fetchColors,
    });

    await queryClient.prefetchQuery({
      queryKey: ['sizes'],
      queryFn: fetchSizes,
    });

    await queryClient.prefetchQuery({
      queryKey: ['prices'],
      queryFn: fetchPrices,
    });
  } catch (err) {
    console.error('Error fetching filter options: ', err);
  }

  const genders = queryClient.getQueryData<{ data: Gender[] }>(['genders']);
  const brands = queryClient.getQueryData<{ data: Brands[] }>(['brands']);
  const categories = queryClient.getQueryData<{ data: Category[] }>([
    'categories',
  ]);
  const colors = queryClient.getQueryData<{ data: Color[] }>(['colors']);
  const sizes = queryClient.getQueryData<{ data: Sizes[] }>(['sizes']);
  const prices = queryClient.getQueryData<{ data: Prices[] }>(['prices']);

  if (
    !genders?.data ||
    !brands?.data ||
    !categories?.data ||
    !colors?.data ||
    !sizes?.data ||
    !prices?.data
  ) {
    return 'Loading';
  }

  const pricesFetched: number[] = [0, prices.data[0].attributes.price];

  const filterOptions = {
    genders: getFromAPItoGenericFormat(genders),
    brands: getFromAPItoGenericFormat(brands),
    categories: getFromAPItoGenericFormat(categories),
    colors: getFromAPItoGenericFormat(colors),
    sizes: getFromAPItoSizesFormat(sizes),
    prices: pricesFetched,
  };

  const filter =
    Object.keys(searchParams).length > 0
      ? setFilterFromParams(searchParams, filterOptions)
      : filterOptions;

  await queryClient.prefetchQuery({
    queryKey: ['products-filtered', filter, searchParams.search],
    queryFn: () =>
      fetchFilteredProducts(
        '/products' +
          getFromFiltersToAPIParams(
            filter,
            Array.isArray(searchParams.search)
              ? searchParams.search[0]
              : searchParams.search
          )
      ),
    staleTime: 1000 * 60 * 5,
  });

  const products = queryClient.getQueryData<{ data: any[] }>([
    'products-filtered',
    filter,
    searchParams.search,
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageContainer
        filterOptions={filterOptions}
        initialProducts={products ? products : { data: [] }}
      />
    </HydrationBoundary>
  );
}
