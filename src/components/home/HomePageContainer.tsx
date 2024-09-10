'use client';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import Header from '@/components/common/Header/Header';
import { FilterSideBar } from '@/components/common/FilterSideBar/FilterSideBar';
import { useEffect, useState } from 'react';
import useFilter from '@/hooks/useFilter';
import { useProducts } from '@/context/ProductsContext';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

import { fetchProducts } from '@/utils/fetchData';
import HomePageContent from './HomePageContent';

interface HomePageContainerProps {
  initialSearchTerm: string;
}

export default function HomePageContainer({
  initialSearchTerm,
}: HomePageContainerProps) {
  const [showFilters, setShowFilters] = useState(false);
  const { filter, updateFilter } = useFilter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const { setProducts } = useProducts();
  const [productsNameList, setProductsNameList] = useState<string[]>([]);
  const isDesktop = useMediaQuery('(min-width: 900px)');

  const router = useRouter();

  /* eslint-disable */
  useEffect(() => {
    if (searchTerm === '') {
      router.push('?search=');
    } else {
      router.push('?search=' + searchTerm);
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(searchTerm);
        setProductsNameList(data.data.map(product => product.attributes.name));
        setProducts(data.data);
      } catch (error) {
        console.error('Failed to fetch products: ', error);
      }
    };
    loadProducts();
  }, [searchTerm, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {isDesktop ? (
        <Header
          setSearch={setSearchTerm}
          productsList={productsNameList}
          search={searchTerm}
        />
      ) : !showFilters ? (
        <Header
          setSearch={setSearchTerm}
          productsList={productsNameList}
          search={searchTerm}
        />
      ) : (
        <IconButton
          sx={{ width: '40px', m: '25px 20px 0 auto' }}
          onClick={() => setShowFilters(false)}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FilterSideBar
          searchTerm={searchTerm}
          showFilters={showFilters}
          updateFilter={updateFilter}
        />
        <HomePageContent
          searchTerm={searchTerm}
          filter={filter}
          showFilters={showFilters}
          setShowFilters={() => setShowFilters(!showFilters)}
        />
      </Box>
    </Box>
  );
}
