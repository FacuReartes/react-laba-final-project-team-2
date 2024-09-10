import { Box } from '@mui/material';
import { FilterHead } from './FilterHead';
import { FilterForm } from './FilterForm';
import { FilterTypes } from '@/hooks/useFilter';

interface FilterSideBarProps {
  searchTerm?: string;
  showFilters: boolean;
  updateFilter: (filter: FilterTypes) => void;
}

export const FilterSideBar = ({
  searchTerm,
  showFilters,
  updateFilter,
}: FilterSideBarProps) => {
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
      <FilterHead searchTerm={searchTerm} />
      <FilterForm updateFilter={updateFilter} />
    </Box>
  );
};
