import { useState } from 'react';

export interface FilterTypes {
  gender?: string;
  kids?: string;
  brands?: string[];
  prices?: number[];
  colors?: string[];
}

const useFilter = () => {
  const [filter, setFilter] = useState<FilterTypes>({});

  const updateFilter = (newFilter: FilterTypes) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  return { filter, updateFilter };
};

export default useFilter;
