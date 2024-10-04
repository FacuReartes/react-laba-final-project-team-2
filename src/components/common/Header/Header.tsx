'use client';
import React, { useEffect, useState } from 'react';
import HeaderBar from './HeaderBar';
import { Box } from '@mui/material';
import HeaderSearchResults from './HeaderSearchResults';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import { fetchSearchProducts } from '@/utils/fetchSearchProducts';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounce = useDebounce(searchTerm, 500);
  const [openResults, setOpenResults] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [enterKeyPress, setEnterKeyPress] = useState(false);

  const queryClient = getQueryClient();

  const { data: products } = useQuery({
    queryKey: ['search-products', searchTermDebounce],
    queryFn: () => fetchSearchProducts(searchTermDebounce),
    enabled: triggerRefetch,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (searchTermDebounce.length > 0) {
      setTriggerRefetch(true);
      setOpenResults(true);
      queryClient.invalidateQueries({ queryKey: ['search-products'] });
    } else {
      setOpenResults(false);
      setTriggerRefetch(false);
    }
  }, [searchTermDebounce]);

  useEffect(() => {
    if (enterKeyPress) {
      setEnterKeyPress(false);
      setOpenResults(false);
      setTriggerRefetch(false);
      const params = new URLSearchParams();
      params.set('search', searchTermDebounce);
      window.location.href = `${window.location.origin}/?${params.toString()}`;
    }
  }, [enterKeyPress]);

  return (
    <Box sx={{ position: 'relative' }}>
      <HeaderBar
        search={searchTerm}
        setSearchTerm={setSearchTerm}
        setOpenResults={setOpenResults}
        setEnterKeyPress={setEnterKeyPress}
      />
      <HeaderSearchResults
        searchTerm={searchTerm}
        productsList={products?.data}
        openResults={openResults}
      />
    </Box>
  );
};

export default Header;
