import { env } from '../../env';

const URL = `${env.BASE_URL}`;

const fetchData = async (path: string) => {
  const response = await fetch(URL + path);
  if (!response.ok) throw new Error('Failed to fetch genders');
  return await response.json();
};

export const fetchGenders = async () => {
  return fetchData('/genders');
};

export const fetchBrands = async () => {
  return await fetchData('/brands');
};

export const fetchColors = async () => {
  return fetchData('/colors');
};

export const fetchCategories = async () => {
  return fetchData('/categories');
};

export const fetchSizes = async () => {
  return fetchData('/sizes');
};

export const fetchPrices = async () => {
  return fetchData(
    '/products?sort[price]=desc&fields=price&filters[teamName]=team-2'
  );
};
