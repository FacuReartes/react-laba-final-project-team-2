import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { FilterGender, GenderTypes } from './FilterGender';
import { FilterKids, KidsStateTypes } from './FilterKids';
import { BrandType, FilterBrand } from './FilterBrand';
import { FilterPrice } from './FilterPrice';
import { ColorType, FilterColor } from './FilterColor';
import { FilterTypes } from '@/hooks/useFilter';

const mockBrands = [
  { name: 'Nike', selected: false },
  { name: 'Adidas', selected: false },
  { name: 'Puma', selected: false },
  { name: 'Reebok', selected: false },
  { name: 'Under Armour', selected: false },
  { name: 'New Balance', selected: false },
];
const mockColors = [
  { name: 'Red', selected: false },
  { name: 'Blue', selected: false },
  { name: 'Black', selected: false },
  { name: 'White', selected: false },
  { name: 'Green', selected: false },
  { name: 'Yellow', selected: false },
  { name: 'Gray', selected: false },
  { name: 'Purple', selected: false },
];
const mockPrices = {
  Min: 0,
  Max: 600,
};

interface FilterFormProps {
  updateFilter: (filter: FilterTypes) => void;
}
export const FilterForm = ({ updateFilter }: FilterFormProps) => {
  const [gender, setGender] = useState<GenderTypes>({
    Men: false,
    Women: false,
  });
  const [kids, setKids] = useState<KidsStateTypes>({
    Boys: false,
    Girls: false,
  });
  const [brands, setBrands] = useState<BrandType[]>(mockBrands);
  const [prices, setPrices] = useState<number[]>([
    mockPrices.Min,
    mockPrices.Max,
  ]);
  const [colors, setColors] = useState<ColorType[]>(mockColors);
  /* eslint-disable */
  useEffect(() => {
    updateFilter({
      gender:
        gender.Men && gender.Women
          ? undefined
          : gender.Men
            ? 'Men'
            : gender.Women
              ? 'Women'
              : undefined,
      kids:
        kids.Boys && kids.Girls
          ? undefined
          : kids.Boys
            ? 'Boys'
            : kids.Girls
              ? 'Girls'
              : undefined,
      brands: brands.filter(brand => brand.selected).map(brand => brand.name),
      prices: prices,
      colors: colors.filter(color => color.selected).map(color => color.name),
    });
  }, [gender, kids, brands, prices, colors]);
  const handleOnGenderChange = (selectedGender: keyof GenderTypes) => {
    setGender(prevState => ({
      ...prevState,
      [selectedGender]: !prevState[selectedGender],
    }));
  };
  const handleOnKidsChange = (selectedKids: keyof KidsStateTypes) => {
    setKids(prevState => ({
      ...prevState,
      [selectedKids]: !prevState[selectedKids],
    }));
  };
  const handleOnBrandChange = (updatedBrand: BrandType) => {
    setBrands(prevBrands =>
      prevBrands.map(brand =>
        brand.name === updatedBrand.name
          ? { ...brand, selected: updatedBrand.selected }
          : brand
      )
    );
  };
  const handleOnColorChange = (updatedColor: ColorType) => {
    setColors(prevColors =>
      prevColors.map(color =>
        color.name === updatedColor.name
          ? { ...color, selected: updatedColor.selected }
          : color
      )
    );
  };

  const handleOnPricesChange = (prices: number[]) => {
    setPrices(prices);
  };
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        border: 'none',
      }}
    >
      <FilterGender
        selectedGender={gender}
        onGenderChange={handleOnGenderChange}
      />

      <FilterKids selectedKids={kids} onKidsChange={handleOnKidsChange} />
      <FilterBrand brands={brands} onBrandChange={handleOnBrandChange} />
      <FilterPrice
        Min={mockPrices.Min}
        Max={mockPrices.Max}
        selectedPrice={prices}
        onPriceChange={handleOnPricesChange}
      />
      <FilterColor colors={colors} onColorChange={handleOnColorChange} />
    </Box>
  );
};
