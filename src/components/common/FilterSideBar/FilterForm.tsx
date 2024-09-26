import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { FilterGender } from './FilterGender';
import { FilterBrand } from './FilterBrand';
import { FilterPrice } from './FilterPrice';
import { FilterTypes } from '@/hooks/useFilter';
import { DataType } from '@/lib/definitions';
import { FilterColor } from './FilterColor';
import { FilterCategory } from './FilterCategory';
import { FilterSizes } from './FilterSizes';

export type SizesType = {
  id: number;
  value: number;
  selected: boolean;
};

export interface FilterOptionsType {
  genders: DataType[];
  brands: DataType[];
  colors: DataType[];
  categories: DataType[];
  sizes: SizesType[];
  prices: number[];
}

interface FilterFormProps {
  updateFilter: (filter: FilterTypes) => void;
  initialFilter: FilterTypes;
  filterOptions: FilterOptionsType;
}
export const FilterForm = ({
  filterOptions,
  initialFilter,
  updateFilter,
}: FilterFormProps) => {
  const [genders, setGenders] = useState<DataType[]>(filterOptions.genders);
  const [brands, setBrands] = useState<DataType[]>(filterOptions.brands);
  const [categories, setCategories] = useState<DataType[]>(
    filterOptions.categories
  );
  const [sizes, setSizes] = useState<SizesType[]>(filterOptions.sizes);
  const [prices, setPrices] = useState<number[]>(filterOptions.prices);
  const [colors, setColors] = useState<DataType[]>(filterOptions.colors);

  useEffect(() => {
    if (
      filterOptions.brands ||
      filterOptions.genders ||
      filterOptions.colors ||
      filterOptions.categories ||
      filterOptions.sizes ||
      filterOptions.prices
    ) {
      setBrands(filterOptions.brands);
      setGenders(filterOptions.genders);
      setColors(filterOptions.colors);
      setCategories(filterOptions.categories);
      setSizes(filterOptions.sizes);
      setPrices(filterOptions.prices);
    }
  }, []);

  useEffect(() => {
    if (initialFilter) {
      if (initialFilter.brands) {
        setBrands(initialFilter.brands);
      }
      if (initialFilter.genders) {
        setGenders(initialFilter.genders);
      }
      if (initialFilter.prices && initialFilter.prices.length === 2) {
        setPrices(initialFilter.prices);
      }
      if (initialFilter.colors) {
        setColors(initialFilter.colors);
      }
      if (initialFilter.categories) {
        setCategories(initialFilter.categories);
      }
      if (initialFilter.sizes) {
        setSizes(initialFilter.sizes);
      }
    }
  }, [initialFilter]);

  useEffect(() => {
    if (
      genders !== initialFilter.genders ||
      brands !== initialFilter.brands ||
      prices !== initialFilter.prices ||
      colors !== initialFilter.colors ||
      sizes !== initialFilter.sizes ||
      categories !== initialFilter.categories
    ) {
      updateFilter({ genders, brands, prices, colors, sizes, categories });
    }
  }, [genders, brands, prices, colors, sizes, categories]);

  const handleOnGenderChange = (selectedId: number) => {
    setGenders(prevGenders =>
      prevGenders.map(gender =>
        gender.id === selectedId
          ? { ...gender, selected: !gender.selected }
          : gender
      )
    );
  };

  const handleOnBrandChange = (selectedId: number) => {
    setBrands(prevBrands =>
      prevBrands.map(brand =>
        brand.id === selectedId
          ? { id: brand.id, name: brand.name, selected: !brand.selected }
          : brand
      )
    );
  };

  const handleOnColorChange = (selectedId: number) => {
    setColors(prevColors =>
      prevColors.map(color =>
        color.id === selectedId
          ? { ...color, selected: !color.selected }
          : color
      )
    );
  };

  const handleOnCategoryChange = (selectedId: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === selectedId
          ? { ...category, selected: !category.selected }
          : category
      )
    );
  };

  const handleOnPricesChange = (prices: number[]) => {
    setPrices(prices);
  };

  const handleOnSizeChange = (selectedId: number) => {
    setSizes(prevSizes =>
      prevSizes.map(size =>
        size.id === selectedId ? { ...size, selected: !size.selected } : size
      )
    );
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        border: 'none',
      }}
    >
      <FilterGender genders={genders} onGenderChange={handleOnGenderChange} />

      <FilterBrand brands={brands} onBrandChange={handleOnBrandChange} />

      <FilterPrice
        Min={0}
        Max={filterOptions.prices[1]}
        selectedPrice={prices}
        onPriceChange={handleOnPricesChange}
      />
      <FilterColor colors={colors} onColorChange={handleOnColorChange} />
      <FilterCategory
        categories={categories}
        onCategoryChange={handleOnCategoryChange}
      />
      <FilterSizes sizes={sizes} onSizeChange={handleOnSizeChange} />
    </Box>
  );
};
