import { DataType } from '@/lib/definitions';
import SearchCheckboxList from '../Search/SearchCheckboxList';
import FilterField from './FilterField';

interface Props {
  brands: DataType[];
  onBrandChange: (id: number) => void;
}

export const FilterBrand = ({ brands, onBrandChange }: Props) => {
  return (
    <FilterField fieldName="Brands">
      <SearchCheckboxList
        list={brands}
        placeholder="Search Brands"
        id="brands"
        onChange={onBrandChange}
      />
    </FilterField>
  );
};
