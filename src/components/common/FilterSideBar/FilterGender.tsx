import { DataType } from '@/lib/definitions';
import CheckboxList from '../SearchCheckboxList/CheckboxList';
import FilterField from './FilterField';

interface Props {
  genders: DataType[];
  onGenderChange: (id: number) => void;
}

export const FilterGender = ({ genders, onGenderChange }: Props) => {
  return (
    <FilterField fieldName="Genders">
      <CheckboxList array={genders} handleToggle={onGenderChange} />
    </FilterField>
  );
};
