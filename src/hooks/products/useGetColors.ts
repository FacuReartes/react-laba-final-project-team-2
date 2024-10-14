import { env } from '../../../env';

export default function useGetColors() {
  const queryKey = ['color'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/colors`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
