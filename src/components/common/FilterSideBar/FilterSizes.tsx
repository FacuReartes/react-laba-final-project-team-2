import FilterField from './FilterField';
import { SizesType } from './FilterForm';
import ToggleList from '../ToggleList';

interface Props {
  sizes: SizesType[];
  onSizeChange: (id: number) => void;
}

export const FilterSizes = ({ sizes, onSizeChange }: Props) => {
  return (
    <FilterField fieldName="Sizes">
      <ToggleList array={sizes} onToggleChange={onSizeChange} />
    </FilterField>
  );
};
