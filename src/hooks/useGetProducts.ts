import { ProductType } from '@/lib/definitions';
import axios, { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useGetProducts() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: filterProducts,
  });

  async function getProducts() {
    try {
      const req = axios(
        'https://shoes-shop-strapi.herokuapp.com/api/products?populate=*'
      );
      const res = (await req).data.data;
      return res;
    } catch (error: unknown) {
      const knownError = error as AxiosError;
      if (knownError.response)
        console.log('response error', knownError.response.status);
      else if (knownError.request)
        console.log('request error', knownError.request);
      else console.log('Error', knownError.message);
    }
  }

  async function filterProducts() {
    const result = await getProducts();
    return result.filter(
      (item: ProductType) => item.attributes.teamName === 'team-2'
    );
    // return result.filter(
    //   (item: ProductType) => item.attributes.name === 'team-5'
    // );
  }

  return {
    products: products.data,
    loading: products.isPending,
    error: { isError: products.isError, error: products.error },
  };
}
