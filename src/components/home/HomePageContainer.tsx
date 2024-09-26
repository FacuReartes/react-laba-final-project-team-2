'use client';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import Header from '@/components/common/Header/Header';
import { FilterSideBar } from '@/components/common/FilterSideBar/FilterSideBar';
import { useEffect, useState } from 'react';
import useFilter from '@/hooks/useFilter';
import CloseIcon from '@mui/icons-material/Close';
import HomePageContent from './HomePageContent';
import { FilterOptionsType } from '../common/FilterSideBar/FilterForm';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { env } from '../../../env';

interface HomePageContainerProps {
  paramsQuery: Record<string, string | string[]>;
  filterOptions: FilterOptionsType;
}

const URL = env.BASE_URL;

const fetchFilteredProducts = async (path: string) => {
  const response = await fetch(URL + path);
  if (!response.ok) throw new Error('Failed to fetch genders');
  return await response.json();
};

export default function HomePageContainer({
  paramsQuery,
  filterOptions,
}: HomePageContainerProps) {
  const [showFilters, setShowFilters] = useState(false);
  const {
    filter,
    updateFilter,
    fromFiltersToAPI,
    setFilterFromParams,
    getFiltersAsParams,
    initialFilter,
  } = useFilter();
  const [searchTerm, setSearchTerm] = useState<string | string[]>('');

  const isDesktop = useMediaQuery('(min-width: 900px)');
  const router = useRouter();
  const { data: products, isPending } = useQuery({
    queryKey: ['products-filtered', filter, searchTerm],
    queryFn: async () =>
      await fetchFilteredProducts(
        '/products' + fromFiltersToAPI(filter, searchTerm)
      ),
    enabled: Boolean(filter),
  });

  useEffect(() => {
    if (filterOptions && paramsQuery) {
      setFilterFromParams(paramsQuery, filterOptions);
      setSearchTerm(paramsQuery.search);
    }
  }, []);

  useEffect(() => {
    router.push(getFiltersAsParams(filter, searchTerm));
  }, [filter]);

  return (
    initialFilter && (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {isDesktop ? (
          <Header
            search={Array.isArray(searchTerm) ? searchTerm[0] : searchTerm}
          />
        ) : !showFilters ? (
          <Header
            search={Array.isArray(searchTerm) ? searchTerm[0] : searchTerm}
          />
        ) : (
          <IconButton
            sx={{ width: '40px', m: '25px 20px 0 auto' }}
            onClick={() => setShowFilters(false)}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          <FilterSideBar
            filterOptions={filterOptions}
            searchTerm={Array.isArray(searchTerm) ? searchTerm[0] : searchTerm}
            showFilters={showFilters}
            updateFilter={updateFilter}
            initialFilter={initialFilter}
            matches={products?.data.length ? products.data.length : 0}
          />
          
          <HomePageContent
            products={products?.data}
            searchTerm={
              Array.isArray(searchTerm) ? searchTerm[0] : searchTerm
            }
            showFilters={showFilters}
            setShowFilters={() => setShowFilters(!showFilters)}
            isPending={isPending}
          />

        </Box>
      </Box>
    )
  );
}
