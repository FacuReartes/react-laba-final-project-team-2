import { DataType } from '@/lib/definitions';
import SearchCheckboxList from '../Search/SearchCheckboxList';
import FilterField from '../Filter/FilterField';

interface Props {
  categories: DataType[];
  onCategoryChange: (id: number) => void;
}

export const FilterCategory = ({ categories, onCategoryChange }: Props) => {
  return (
    <FilterField fieldName="Category">
      <SearchCheckboxList
        list={categories}
        placeholder="Search Category"
        id="categories"
        onChange={onCategoryChange}
      />
    </FilterField>
  );
};
