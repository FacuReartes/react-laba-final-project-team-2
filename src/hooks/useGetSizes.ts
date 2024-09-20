export default function useGetSizes() {
  const queryKey = ['sizes'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/sizes'
    );
    const res = await req.json();
    return res.data
  }

  return {
    queryKey,
    queryFn
  }
};