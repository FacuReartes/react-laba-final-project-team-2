import { env } from '../../../env';

export default function useGetCategories() {
  const queryKey = ['categories'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/categories`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
