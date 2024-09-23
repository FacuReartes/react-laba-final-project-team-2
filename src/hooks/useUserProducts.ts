export default function useUserProducts(jwt: string | undefined) {
  const queryKey = ['user-products'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/users/me?populate=*',
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const res = await req.json();
    return res.products;
  };

  return { queryKey, queryFn, enabled: Boolean(jwt), scaleTime: 300000 };
}
