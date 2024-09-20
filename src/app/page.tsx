import HomePageContainer from '@/components/home/HomePageContainer';
import {
  Brands,
  Category,
  Color,
  Gender,
  GenericType,
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
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface HomeProps {
  searchParams: Record<string, string | string[]>;
}

function fromAPItoFilterFormat(object: { data: GenericType[] } | undefined) {
  if (!object || !object.data) {
    return [];
  }
  return object?.data.map((element: any) => ({
    id: element.id,
    name: element.attributes.name,
    selected: false,
  }));
}

export default async function Home({ searchParams }: HomeProps) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

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

  const genders = queryClient.getQueryData<{ data: Gender[] }>(['genders']);
  const brands = queryClient.getQueryData<{ data: Brands[] }>(['brands']);
  const categories = queryClient.getQueryData<{ data: Category[] }>([
    'categories',
  ]);
  const colors = queryClient.getQueryData<{ data: Color[] }>(['colors']);
  const sizes = queryClient.getQueryData<{ data: Sizes[] }>(['sizes']);
  const prices = queryClient.getQueryData<{ data: Prices[] }>(['prices']);

  if (!genders || !brands || !categories || !colors || !sizes || !prices) {
    return 'Loading';
  }

  const sizesFetched = sizes.data.map((element: any) => ({
    id: element.id,
    value: element.attributes.value,
    selected: false,
  }));

  const pricesFetched: number[] = [0, prices.data[0].attributes.price];

  const filterOptions = {
    genders: fromAPItoFilterFormat(genders),
    brands: fromAPItoFilterFormat(brands),
    categories: fromAPItoFilterFormat(categories),
    colors: fromAPItoFilterFormat(colors),
    sizes: sizesFetched,
    prices: pricesFetched,
  };
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageContainer
        paramsQuery={searchParams}
        filterOptions={filterOptions}
      />
    </HydrationBoundary>
  );
}
