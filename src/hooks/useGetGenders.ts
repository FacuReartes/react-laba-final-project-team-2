export default function useGetGenders() {
  const queryKey = ['gender'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/genders'
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
