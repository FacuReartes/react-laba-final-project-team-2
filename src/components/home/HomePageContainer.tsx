'use client';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import Header from '@/components/common/Header/Header';
import { FilterSideBar } from '@/components/common/FilterSideBar/FilterSideBar';
import { useEffect, useState } from 'react';
import useFilter, { FilterTypes } from '@/hooks/useFilter';
import CloseIcon from '@mui/icons-material/Close';
import HomePageContent from './HomePageContent';
import { FilterOptionsType } from '../common/FilterSideBar/FilterForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import {
  fetchFilteredProducts,
  getFromFiltersToAPIParams,
} from '@/utils/prefetchingProducts';

interface HomePageContainerProps {
  paramsQuery: Record<string, string | string[]>;
  filterOptions: FilterOptionsType;
  initialProducts: { data: any[] };
}

export default function HomePageContainer({
  paramsQuery,
  filterOptions,
  initialProducts,
}: HomePageContainerProps) {
  const [showFilters, setShowFilters] = useState(false);
  const {
    filter,
    updateFilter,
    setFilterFromParams,
    getFiltersAsParams,
    initialFilter,
  } = useFilter({ initial: filterOptions });
  const [searchTerm, setSearchTerm] = useState<string | string[]>('');

  const isDesktop = useMediaQuery('(min-width: 900px)');
  const router = useRouter();
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ['products-filtered'],
    queryFn: () =>
      fetchFilteredProducts(
        '/products' + getFromFiltersToAPIParams(filter, searchTerm)
      ),
    staleTime: 1000 * 60 * 5,
    initialData: initialProducts,
    enabled: triggerFetch,
  });

  useEffect(() => {
    if (filterOptions && paramsQuery) {
      setFilterFromParams(paramsQuery, filterOptions);
      setSearchTerm(paramsQuery.search);
    }
  }, []);

  const serializedFilter = JSON.stringify(filter);

  useEffect(() => {
    if (triggerFetch) {
      setTriggerFetch(false);
      queryClient.invalidateQueries({ queryKey: ['products-filtered'] });
      router.push(getFiltersAsParams(filter, searchTerm));
    }
  }, [serializedFilter]);

  const handleUpdateFilter = (newFilter: FilterTypes) => {
    updateFilter(newFilter);
    setTriggerFetch(true);
  };

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
            updateFilter={handleUpdateFilter}
            initialFilter={initialFilter}
            matches={products.data?.length ? products.data.length : 0}
          />

          <HomePageContent
            products={products.data}
            searchTerm={Array.isArray(searchTerm) ? searchTerm[0] : searchTerm}
            showFilters={showFilters}
            setShowFilters={() => setShowFilters(!showFilters)}
          />
        </Box>
      </Box>
    )
  );
}
