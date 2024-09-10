'use client';
import React, { useEffect, useState } from 'react';

import HeaderBar from './HeaderBar';
import { Box } from '@mui/material';
import HeaderSearchResults from './HeaderSearchResults';
import useDebounce from '@/hooks/useDebounce';

interface HeaderProps {
  setSearch?: (term: string) => void;
  productsList?: string[];
  search?: string;
}

const Header = ({ setSearch, productsList, search }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounce = useDebounce(searchTerm, 500);
  const [openResults, setOpenResults] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    if (setSearch) {
      if (searchTermDebounce.length > 0) {
        setSearch(searchTermDebounce);
        setOpenResults(true);
      } else {
        // setSearch('');
      }
    }
  }, [searchTermDebounce]);

  return (
    <Box sx={{ position: 'relative' }}>
      <HeaderBar
        search={search}
        setSearchTerm={setSearchTerm}
        setOpenResults={setOpenResults}
      />
      <HeaderSearchResults
        searchTerm={searchTerm}
        productsNameList={productsList}
        openResults={openResults}
      />
    </Box>
  );
};

export default Header;
