import { env } from '../../../env';

export default function useGetSizes() {
  const queryKey = ['sizes'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/sizes`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
