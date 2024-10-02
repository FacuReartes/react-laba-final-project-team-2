import { fetchDataFromAPI } from './fetchDataFromAPI';

export const fetchGenders = async () => {
  return fetchDataFromAPI('/genders');
};

export const fetchBrands = async () => {
  return await fetchDataFromAPI('/brands');
};

export const fetchColors = async () => {
  return fetchDataFromAPI('/colors');
};

export const fetchCategories = async () => {
  return fetchDataFromAPI('/categories');
};

export const fetchSizes = async () => {
  return fetchDataFromAPI('/sizes');
};

export const fetchPrices = async () => {
  return fetchDataFromAPI(
    '/products?sort[price]=desc&fields=price&filters[teamName]=team-2'
  );
};
