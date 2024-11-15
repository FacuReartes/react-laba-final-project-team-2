'use client';
import ProductsContainer from '@/components/home/ProductsContainer';
import { Box, Typography, Button } from '@mui/material';
import Loading from '../common/Loading';
import { useSearchParams } from 'next/navigation';
import { InfiniteData } from '@tanstack/react-query';

interface Props {
  showFilters: boolean;
  setShowFilters: () => void;
  data: InfiniteData<any, unknown> | undefined;
  isPending: boolean;
  spanRef: React.Ref<HTMLSpanElement>;
}

export default function HomePageContent({
  data,
  showFilters,
  setShowFilters,
  isPending,
  spanRef,
}: Props) {
  const searchTerm = useSearchParams().get('search');
  const allProducts = data?.pages.flatMap(page => page.data) || [];
  const matches = allProducts.length;
  return (
    <Box
      sx={{
        width: '100%',
        display: showFilters ? { xs: 'none', md: 'flex' } : 'flex',
        flexDirection: 'column',
        p: showFilters
          ? { md: '60px 60px 0 20px' }
          : { md: '60px', xs: '30px' },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          alignItems: { md: 'center', xs: '' },
          mb: { md: '28px', xs: '13px' },
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { md: '45px', xs: '30px' } }}>
          Search Results
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: { xs: '20px' },
          }}
        >
          <Box>
            <Typography
              sx={{
                m: '20px 0  4px',
                display: { xs: 'block', md: 'none' },
                fontSize: '15px',
                lineHeight: '15px',
              }}
              variant="subtitle1"
            >
              Shoes / {searchTerm ? searchTerm : ''}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                display: { xs: 'block', md: 'none' },
                fontSize: '20px',
                lineHeight: '20px',
              }}
            >
              {searchTerm ? `${searchTerm} (${matches})` : ''}
            </Typography>
          </Box>
          <Button
            onClick={setShowFilters}
            sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}
          >
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Typography sx={{ display: { md: 'flex', xs: 'none' } }}>
                {showFilters ? 'Hide' : 'Show'}{' '}
              </Typography>
              <Typography>Filters</Typography>
            </Box>
            <img
              width="24px"
              height="24px"
              src={
                showFilters
                  ? './assets/filter-remove.svg'
                  : './assets/filter-search.svg'
              }
              alt={showFilters ? 'Hide Filters' : 'Show Filters'}
            />
          </Button>
        </Box>
      </Box>
      {isPending ? (
        <Loading />
      ) : (
        <ProductsContainer data={data} spanRef={spanRef} />
      )}
    </Box>
  );
}
