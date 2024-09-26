import { FilterTypes } from '@/hooks/useFilter';

export const getFromFiltersToAPIParams = (
  filter: FilterTypes,
  searchTerm: string[] | string
) => {
  let path = '?filters[teamName]=team-2&populate=*';

  if (!filter.brands) {
    return path;
  }

  const brandsFilter = filter.brands
    ?.filter(brand => brand.selected === true)
    .map(brand => `&filters[brand]=${brand.id}`)
    .join('');

  const gendersFilter = filter.genders
    ?.filter(gender => gender.selected === true)
    .map(gender => `&filters[gender]=${gender.id}`)
    .join('');

  const colorsFilter = filter.colors
    ?.filter(color => color.selected === true)
    .map(color => `&filters[color]=${color.id}`)
    .join('');

  const categoriesFilter = filter.categories
    ?.filter(category => category.selected === true)
    .map(category => `&filters[categories]=${category.id}`)
    .join('');

  if (filter.prices?.length === 2) {
    const pricesFilter =
      '&filters[price][$between]=' +
      filter.prices[0] +
      '&filters[price][$between]=' +
      filter.prices[1];

    path += pricesFilter;
  }

  if (searchTerm) {
    if (Array.isArray(searchTerm)) {
      path += '&filters[name][$containsi]=' + searchTerm[0];
    } else {
      path += '&filters[name][$containsi]=' + searchTerm;
    }
  }
  if (brandsFilter) {
    path += brandsFilter;
  }
  if (gendersFilter) {
    path += gendersFilter;
  }
  if (colorsFilter) {
    path += colorsFilter;
  }
  if (categoriesFilter) {
    path += categoriesFilter;
  }
  return path;
};

const URL = 'https://shoes-shop-strapi.herokuapp.com/api';

export const fetchFilteredProducts = async (path: string) => {
  const response = await fetch(URL + path);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};
