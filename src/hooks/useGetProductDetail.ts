import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetProductDetail(id: number) {
  const product = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  async function getProduct(id: number) {
    const req = await axios(
      `https://shoes-shop-strapi.herokuapp.com/api/products/${id}?populate=*`
    );
    const res = await req.data.data;
    return res;
  }

  return {
    product: product.data,
    loading: product.isLoading,
    error: {
      isError: product.isError,
      error: product.error,
    },
  };
}
