'use client';
import React, { useEffect, useState } from 'react';
import HeaderBar from './HeaderBar';
import { Box } from '@mui/material';
import HeaderSearchResults from './HeaderSearchResults';
import useDebounce from '@/hooks/useDebounce';
import useSearchProducts from '@/hooks/useSearchProducts';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  search?: string;
}

const Header = ({ search }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounce = useDebounce(searchTerm, 500);
  const [openResults, setOpenResults] = useState(false);
  const { products, refetch } = useSearchProducts(searchTermDebounce);
  const [enterKeyPress, setEnterKeyPress] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (searchTermDebounce.length > 0) {
      refetch();
      setOpenResults(true);
    }
    if (enterKeyPress) {
      setEnterKeyPress(false);
      router.replace('/?search=' + searchTermDebounce);
    }
  }, [searchTermDebounce, enterKeyPress]);

  return (
    <Box sx={{ position: 'relative' }}>
      <HeaderBar
        search={search}
        setSearchTerm={setSearchTerm}
        setOpenResults={setOpenResults}
        setEnterKeyPress={setEnterKeyPress}
      />
      <HeaderSearchResults
        searchTerm={searchTerm}
        productsList={products}
        openResults={openResults}
      />
    </Box>
  );
};

export default Header;
