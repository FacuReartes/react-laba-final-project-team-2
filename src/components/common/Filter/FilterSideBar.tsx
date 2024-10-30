import { Box } from '@mui/material';
import { FilterHead } from './FilterHead';
import { FilterForm, FilterOptionsType } from './FilterForm';
import { FilterTypes } from '@/hooks/useFilter';

interface Props {
  showFilters: boolean;
  initialFilter: FilterTypes;
  updateFilter: (filter: FilterTypes) => void;
  filterOptions: FilterOptionsType;
  matches: number;
}

export const FilterSideBar = ({
  showFilters,
  updateFilter,
  initialFilter,
  filterOptions,
  matches,
}: Props) => {
  return (
    <Box
      sx={{
        width: { md: '360px', xs: '100vw' },
        height: '100%',
        display: showFilters ? 'flex' : 'none',
        flexDirection: 'column',
        zIndex: '10',
      }}
    >
      <FilterHead matches={matches} />
      <FilterForm
        updateFilter={updateFilter}
        initialFilter={initialFilter}
        filterOptions={filterOptions}
      />
    </Box>
  );
};
