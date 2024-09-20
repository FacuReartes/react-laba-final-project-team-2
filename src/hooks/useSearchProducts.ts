import { useQuery } from '@tanstack/react-query';

const URL =
  'https://shoes-shop-strapi.herokuapp.com/api/products?filters[teamName]=team-2&populate=*';

export default function useSearchProducts(searchTerm: string) {
  const products = useQuery({
    queryKey: ['search-products'],
    queryFn: () => fetchSearchProducts(searchTerm),
  });
  async function fetchSearchProducts(searchTerm: string) {
    const url = URL + '&filters[name][$containsi]=' + searchTerm;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
  return {
    products: products.data?.data,
    loading: products.isPending,
    error: { isError: products.isError, error: products.error },
    refetch: products.refetch,
  };
}
