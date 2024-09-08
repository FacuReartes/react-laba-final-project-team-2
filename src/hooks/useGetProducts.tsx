import axios from 'axios';

export default function useGetProducts() {
  async function getProducts() {
    const req = axios(
      'https://shoes-shop-strapi.herokuapp.com/api/products?populate=*'
    );
    const res = (await req).data.data;
    return res;
  }

  async function filterProducts() {
    const result = await getProducts();
    return result.filter(
      (item: { id: string; attributes: { teamName: string } }) =>
        item.attributes.teamName === 'team-2'
    );
  }

  return { filterProducts };
}
