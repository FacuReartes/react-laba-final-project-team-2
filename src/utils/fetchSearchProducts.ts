import { fetchDataFromAPI } from './fetchDataFromAPI';

export async function fetchSearchProducts(searchTerm: string) {
  const data = fetchDataFromAPI(
    '/products?filters[teamName]=team-2&populate=*&filters[name][$containsi]=' +
      searchTerm
  );
  return data;
}
