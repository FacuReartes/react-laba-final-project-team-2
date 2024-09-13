export default function useGetProducts() {
  const queryKey = ['products'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/products?filters[teamName]=team-2&populate=*'
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
