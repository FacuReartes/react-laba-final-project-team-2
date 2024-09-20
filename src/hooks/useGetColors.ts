export default function useGetColors() {
  const queryKey = ['color'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/colors'
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
