import { env } from '../../../env';

export default function useGetBrands() {
  const queryKey = ['brand'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/brands`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
