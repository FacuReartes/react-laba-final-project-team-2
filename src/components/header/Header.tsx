'use client';
import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUserData } from '@/hooks/useUserData';
import HeaderMenu from '../common/header/HeaderMenu';

const Header = () => {
  const { data: session } = useSession();
  const user = useUserData(session?.user.jwt);
  const userData = user.data?.data;

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#FFF',
        height: { xs: '64px', md: '120px' },
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ height: '100%', mr: { xs: '0px', md: '28px' } }}>
        <Box
          sx={{ ml: { xs: '4px', md: '16px' } }}
          component="img"
          alt="logo"
          src="/logo.svg"
        />

        <Typography
          sx={{
            color: '#000',
            fontWeight: '500',
            ml: '44px',
            flexGrow: 1,
            visibility: { xs: 'hidden', md: 'visible' },
          }}
        >
          Products
        </Typography>

        {session ? (
          ''
        ) : (
          <Button
            variant="outlined"
            sx={{
              mr: '40px',
              color: 'secondary.light',
              borderColor: 'secondary.light',
              width: '145px',
              height: '48px',
              fontSize: '12px',
              light: '#FE645E',
              display: { xs: 'none', md: 'flex' },
              ':hover': {
                borderColor: '#fff',
                color: '#FFF',
                bgcolor: 'secondary.light',
              },
            }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              href="/auth/sign-in"
            >
              Sign in
            </Link>
          </Button>
        )}

        <TextField
          label="Search"
          id="search-field"
          variant="outlined"
          size="small"
          sx={{
            input: { color: '#000', height: '30px' },
            mr: '32px',
            width: '320px',
            display: { xs: 'none', md: 'flex' },
          }}
          InputLabelProps={{
            style: { color: '#5C5C5C' },
          }}
          InputProps={{
            style: { borderRadius: '50px', color: '#000' },
            startAdornment: (
              <InputAdornment position="start">
                <Box component="img" alt="search" src="/search.svg" />
              </InputAdornment>
            ),
          }}
        />

        <IconButton
          aria-label="bag"
          sx={{ mr: { xs: '4px', md: '0px' } }}
          href="/bag"
        >
          <Box component="img" alt="bag" src="/bag.svg" />
        </IconButton>

        <IconButton
          aria-label="search-mobile"
          sx={{
            mr: { xs: '4px', md: '28px' },
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <Box
            component="img"
            alt="search-mobile"
            src="/search.svg"
            sx={{ height: '20px', width: '20px' }}
          />
        </IconButton>

        {session ? (
          <Link href="/profile/products">
            <IconButton
              aria-label="bag"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Avatar
                alt="profileAvatar"
                src={userData?.avatar?.url}
                sx={{ width: '24px', height: '24px' }}
              />
            </IconButton>
          </Link>
        ) : (
          ''
        )}

        <HeaderMenu/>

      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;
