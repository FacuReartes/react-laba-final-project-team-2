import SearchCheckboxList from '../SearchCheckboxList/SearchCheckboxList';
import { DataType } from '@/lib/definitions';
import FilterField from './FilterField';

interface Props {
  colors: DataType[];
  onColorChange: (id: number) => void;
}

export const FilterColor = ({ colors, onColorChange }: Props) => {
  return (
    <FilterField fieldName="Colors">
      <SearchCheckboxList
        list={colors}
        placeholder="Search Colors"
        id="colors"
        onChange={onColorChange}
      />
    </FilterField>
  );
};
