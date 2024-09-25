import { env } from '../../env';

export default function useUserQuery(jwt: string | undefined) {
  const queryKey = ['user-data'];

  const queryFn = async () => {
    const req = await fetch(`${env.BASE_URL}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const res = await req.json();
    return res;
  };

  return { queryKey, queryFn, enabled: Boolean(jwt), scaleTime: 1000 * 60 * 5 };
}
