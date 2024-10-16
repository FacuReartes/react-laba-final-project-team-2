import { FilterOptionsType } from '@/components/common/Filter/FilterForm';

export const setFilterFromParams = (
  params: Record<string, string | string[]>,
  filterOptions: FilterOptionsType
) => {
  let tempBrands: string[] = [];
  let tempColors: string[] = [];
  let tempPrices: number[] = [];
  let tempGender: string[] = [];
  let tempSizes: number[] = [];
  let tempCategories: string[] = [];

  if (params.brands) {
    if (Array.isArray(params.brands)) {
      tempBrands = params.brands;
    } else {
      tempBrands.push(params.brands);
    }
  }
  if (params.colors) {
    if (Array.isArray(params.colors)) {
      tempColors = params.colors;
    } else {
      tempColors.push(params.colors);
    }
  }
  if (params.prices) {
    if (Array.isArray(params.prices)) {
      tempPrices = params.prices[0].split('-').map(price => parseInt(price));
    } else {
      tempPrices = params.prices.split('-').map(price => parseFloat(price));
    }
  }
  if (params.genders) {
    if (Array.isArray(params.genders)) {
      tempGender = params.genders;
    } else {
      tempGender.push(params.genders);
    }
  }
  if (params.sizes) {
    if (Array.isArray(params.sizes)) {
      tempSizes = params.sizes.map(size => parseInt(size));
    } else {
      tempSizes.push(parseInt(params.sizes));
    }
  }
  if (params.categories) {
    if (Array.isArray(params.categories)) {
      tempCategories = params.categories;
    } else {
      tempCategories.push(params.categories);
    }
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
  return {
    genders: genderOption,
    brands: brandsOption,
    colors: colorsOption,
    prices: tempPrices,
    sizes: sizesOption,
    categories: categoriesOption,
  };
};
