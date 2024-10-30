import { FilterOptionsType } from '@/components/common/Filter/FilterForm';
import { DataType, SizesDataType } from '@/lib/definitions';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useState } from 'react';

export interface FilterTypes {
  genders?: DataType[];
  brands?: DataType[];
  prices?: number[];
  colors?: DataType[];
  categories?: DataType[];
  sizes?: SizesDataType[];
}

const useFilter = ({ initial }: { initial: FilterTypes }) => {
  const [filter, setFilter] = useState<FilterTypes>(initial);
  const [initialFilter, setInitialFilter] = useState<FilterTypes>({});

  const updateFilter = (newFilter: FilterTypes) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const getFiltersAsParams = (
    filter: FilterTypes,
    searchTerm: string | null
  ): string => {
    let str = '?';
    if (filter.brands) {
      filter.brands
        .filter(brand => brand.selected === true)
        .map(brand => (str += '&brands=' + brand.name));
    }
    if (filter.colors) {
      filter.colors
        .filter(color => color.selected === true)
        .map(color => (str += '&colors=' + color.name));
    }
    if (filter.genders) {
      filter.genders
        .filter(gender => gender.selected === true)
        .map(gender => (str += '&genders=' + gender.name));
    }
    if (filter.categories) {
      filter.categories
        .filter(category => category.selected === true)
        .map(category => (str += '&categories=' + category.name));
    }
    if (filter.sizes) {
      filter.sizes
        .filter(size => size.selected === true)
        .map(size => (str += '&sizes=' + size.value));
    }
    if (filter.prices) {
      if (filter.prices.length === 2) {
        str += '&prices=' + filter.prices[0] + '-' + filter.prices[1];
      }
    }
    if (searchTerm) {
      str += '&search=' + searchTerm;
    }
    return str;
  };

  const setFilterFromParams = (
    params: ReadonlyURLSearchParams,
    filterOptions: FilterOptionsType
  ) => {
    let tempBrands: string[] = [];
    let tempColors: string[] = [];
    let tempPrices: number[] = [];
    let tempGender: string[] = [];
    let tempSizes: number[] = [];
    let tempCategories: string[] = [];

    if (params.get('brands')) {
      tempBrands = params.getAll('brands');
    }
    if (params.get('colors')) {
      tempColors = params.getAll('colors');
    }
    if (params.get('prices')) {
      const arr = params
        .get('prices')
        ?.split('-')
        .map(price => parseInt(price));
      tempPrices = arr ? arr : [0, 0];
    }
    if (params.get('genders')) {
      tempGender = params.getAll('genders');
    }
    if (params.get('sizes')) {
      tempSizes = params.getAll('sizes').map(size => parseInt(size));
    }
    if (params.get('categories')) {
      tempCategories = params.getAll('categories');
    }
    const genderOption = filterOptions.genders.map(option => ({
      ...option,
      selected: tempGender.some(
        gender => gender.toLowerCase() === option.name.toLowerCase()
      ),
    }));

    const brandsOption = filterOptions.brands.map(option => ({
      ...option,
      selected: tempBrands.some(
        brand => brand.toLowerCase() === option.name.toLowerCase()
      ),
    }));

    const colorsOption = filterOptions.colors.map(option => ({
      ...option,
      selected: tempColors.some(
        color => color.toLowerCase() === option.name.toLowerCase()
      ),
    }));

    const sizesOption = filterOptions.sizes.map(option => ({
      ...option,
      selected: tempSizes.includes(option.value),
    }));

    const categoriesOption = filterOptions.categories.map(option => ({
      ...option,
      selected: tempCategories.some(
        category => category.toLowerCase() === option.name.toLowerCase()
      ),
    }));
    setInitialFilter({
      genders: genderOption,
      brands: brandsOption,
      colors: colorsOption,
      prices: tempPrices,
      sizes: sizesOption,
      categories: categoriesOption,
    });
  };

  const fromFiltersToAPI = (
    filter: FilterTypes,
    searchTerm: string[] | string
  ) => {
    let path = '?filters[teamName]=team-2&populate=*';

    if (
      !filter.brands ||
      !filter.categories ||
      !filter.colors ||
      !filter.genders ||
      !filter.prices ||
      !filter.sizes
    ) {
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

  return {
    filter,
    updateFilter,
    getFiltersAsParams,
    setFilterFromParams,
    fromFiltersToAPI,
    initialFilter,
  };
};

export default useFilter;
