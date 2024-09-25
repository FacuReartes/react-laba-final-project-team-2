import { env } from '../../env';

export default function useGetGenders() {
  const queryKey = ['gender'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/genders`);
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
