'use client';
import ProductsContainer from '@/components/home/ProductsContainer';
import { Box, Typography, Button } from '@mui/material';
import { FilterTypes } from '@/hooks/useFilter';
import { useProducts } from '@/context/ProductsContext';

interface HomePageContentProps {
  filter: FilterTypes;
  showFilters: boolean;
  searchTerm: string;
  setShowFilters: () => void;
}

export default function HomePageContent({
  filter,
  showFilters,
  setShowFilters,
  searchTerm,
}: HomePageContentProps) {
  const { products } = useProducts();
  return (
    <Box
      sx={{
        display: showFilters ? { xs: 'none', md: 'flex' } : { md: 'flex' },
        flexDirection: 'column',
        p: { md: '60px', xs: '30px' },
        pl: showFilters ? '20px' : '60px',
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
              {searchTerm ? `${searchTerm} (${products.length})` : ''}
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
      <ProductsContainer filter={filter} />
    </Box>
  );
}
