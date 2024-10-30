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
import { getFromFiltersToAPIParams } from '@/utils/prefetchingProducts';
import { setFilterFromParams } from '@/utils/setFilterFromParams';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { env } from '@/../env';
interface HomeProps {
  searchParams: Record<string, string | string[]>;
}

export default async function Home({ searchParams }: HomeProps) {
  const queryClient = new QueryClient();

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
    queryKey: ['products-filtered', filter],
    queryFn: async () => {
      const response = await fetch(
        `${env.BASE_URL}/products${getFromFiltersToAPIParams(filter, Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search)}&pagination[page]=1`,
        { next: { revalidate: 0 } }
      );
      const result = await response.json();
      const structuredData = {
        pages: [
          {
            data: result.data || [],
            meta: {
              pagination: {
                page: 1,
                pageSize: 25,
                pageCount: result.meta?.pagination?.pageCount || 1,
                total: result.meta?.pagination?.total || 0,
              },
            },
          },
        ],
        pageParams: [1],
      };
      return structuredData;
    },
  });
  queryClient.invalidateQueries({ queryKey: ['products-filtered', filter] });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageContainer filterOptions={filter} />
    </HydrationBoundary>
  );
}
