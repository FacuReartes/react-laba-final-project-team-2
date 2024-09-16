export default function useGetProductDetail(id: number) {
  const queryKey = ['product'];

  const queryFn = async () => {
    const req = await fetch(
      `https://shoes-shop-strapi.herokuapp.com/api/products/${id}?populate=*`
    );
    const res = await req.json();
    return res.data;
  };

  return {
    queryKey,
    queryFn,
  };
}
