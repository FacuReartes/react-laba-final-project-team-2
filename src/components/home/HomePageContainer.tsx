'use client';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import Header from '@/components/common/Header/Header';
import { FilterSideBar } from '@/components/common/Filter/FilterSideBar';
import { useEffect, useState } from 'react';
import useFilter, { FilterTypes } from '@/hooks/useFilter';
import CloseIcon from '@mui/icons-material/Close';
import HomePageContent from './HomePageContent';
import { FilterOptionsType } from '../common/Filter/FilterForm';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useRouter, useSearchParams } from 'next/navigation';

import { getFromFiltersToAPIParams } from '@/utils/prefetchingProducts';

import { env } from '@/../env';

interface Props {
  filterOptions: FilterOptionsType;
}

export default function HomePageContainer({ filterOptions }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const {
    filter,
    updateFilter,
    setFilterFromParams,
    getFiltersAsParams,
    initialFilter,
  } = useFilter({ initial: filterOptions });
  const [searchTerm, setSearchTerm] = useState<string | null>('');

  const paramsQuery = useSearchParams();
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const router = useRouter();
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const queryClient = new QueryClient();

  const { data, fetchNextPage, isPending } = useInfiniteQuery({
    queryKey: ['products-filtered', filter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${env.BASE_URL}/products${getFromFiltersToAPIParams(filter, searchTerm)}&pagination[page]=${pageParam}`
      );
      const result = await response.json();
      return result || { data: [], meta: {} };
    },
    getNextPageParam: lastPage => {
      const {
        meta: {
          pagination: { page, pageCount },
        },
      } = lastPage;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: false,
  });

  useEffect(() => {
    if (filterOptions && paramsQuery) {
      setFilterFromParams(paramsQuery, filterOptions);
      setSearchTerm(paramsQuery.get('search'));
    }
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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

  const allProducts = data?.pages.flatMap(page => page.data) || [];
  const matches = allProducts.length;

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
          <Header />
        ) : !showFilters ? (
          <Header />
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
            showFilters={showFilters}
            updateFilter={handleUpdateFilter}
            initialFilter={initialFilter}
            matches={matches}
          />

          <HomePageContent
            data={data}
            showFilters={showFilters}
            setShowFilters={() => setShowFilters(!showFilters)}
            isPending={isPending}
          />
        </Box>
        <span
          style={{
            bottom: 0,
          }}
          ref={ref}
        />
      </Box>
    )
  );
}
