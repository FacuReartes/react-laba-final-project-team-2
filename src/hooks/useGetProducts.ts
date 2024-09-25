import { env } from '../../env';

export default function useGetProducts(
  token: string | undefined,
  userID: number | undefined
) {
  const queryKey = ['products'];

  const queryFn = async () => {
    const req = await fetch(
      `${env.BASE_URL}/products?filters[teamName]=team-2&filters[userID]=${userID}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
    enabled: Boolean(token && userID),
  };
}
