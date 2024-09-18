export default function useGetCategories() {
  const queryKey = ['categories'];

  const queryFn = async () => {
    const req = await fetch(
      'https://shoes-shop-strapi.herokuapp.com/api/categories'
    );
    const res = await req.json();
    return res.data
  }

  return {
    queryKey,
    queryFn
  }
};