import { env } from '../../../env';

export default function useGetProductDetail(id: number) {
  const queryKey = [`product-${id}`];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/products/${id}?populate=*`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
