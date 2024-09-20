export default function useGetBrands() {
  const queryKey = ['brand'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/brands'
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
