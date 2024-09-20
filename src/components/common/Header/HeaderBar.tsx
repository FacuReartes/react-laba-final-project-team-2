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
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useState } from 'react';
import { searchSchema } from '@/lib/schemas/commonSchemas';
import { useSession } from 'next-auth/react';
import { useUserData } from '@/hooks/useUserData';
import HeaderMenu from './HeaderMenu';
import { useRouter } from 'next/navigation';

interface HeaderBarProps {
  search?: string;
  setSearchTerm: (value: string) => void;
  setOpenResults: (value: boolean) => void;
  setEnterKeyPress: (value: boolean) => void;
}

const HeaderBar = ({
  setSearchTerm,
  setOpenResults,
  setEnterKeyPress,
  search,
}: HeaderBarProps) => {
  const { data: session } = useSession();
  const user = useUserData(session?.user.jwt);
  const userData = user.data?.data;
  const router = useRouter();

  const [isTyping, setIsTyping] = useState(false);
  const [showInputSearch, setShowInputSearch] = useState(false);

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const validation = searchSchema.safeParse(targetValue);

    if (targetValue.trim() === '') {
      setSearchTerm('');
    } else if (validation.success) {
      setSearchTerm(targetValue);
      setIsTyping(true);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push('/?search=' + search);

      setEnterKeyPress(true);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#FFF',
        height: { xs: '64px', md: '120px' },
        boxShadow: 0,
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
            display: { md: isTyping ? 'none' : 'block', xs: 'none' },
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
              display: { md: isTyping ? 'none' : 'flex', xs: 'none' },
              ':hover': {
                borderColor: '#fff',
                color: '#FFF',
                bgcolor: 'secondary.light',
              },
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
              href="/auth/sign-in"
            >
              Sign in
            </Link>
          </Button>
        )}

        <Box
          sx={{
            width: isTyping ? '100%' : '320px',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: { md: isTyping ? '0 60px' : '0', xs: '' },
          }}
        >
          <TextField
            placeholder="Search"
            id="search-field"
            variant="outlined"
            size="small"
            sx={{
              input: { color: '#000', height: '30px' },
              m: {
                md: isTyping ? '0 auto' : '0 32px 0 0',
                xs: '0 20px 0 28px',
              },
              width: '100%',
              maxWidth: isTyping ? '1070px' : '320px',
              transition: 'max-width 0.5s ease',
              display: showInputSearch ? 'flex' : { xs: 'none', md: 'flex' },
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
            defaultValue={search}
            onChange={handleOnChangeSearch}
            onKeyDown={handleOnKeyDown}
          />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <IconButton
            aria-label="bag"
            sx={{
              mr: { xs: '4px', md: '0px' },
              display: isTyping || showInputSearch ? 'none' : 'flex',
            }}
            href="/bag"
          >
            <Box component="img" alt="bag" src="/bag.svg" />
          </IconButton>

          <IconButton
            aria-label="search-mobile"
            sx={{
              mr: { xs: '4px', md: '28px' },
              display: showInputSearch ? 'none' : { xs: 'flex', md: 'none' },
            }}
            onClick={() => setShowInputSearch(true)}
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
                aria-label="avatar"
                sx={{
                  display: isTyping ? 'none' : { xs: 'none', md: 'block' },
                  mr: '28px',
                }}
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

          <HeaderMenu showInputSearch={showInputSearch} />

          <IconButton
            aria-label="close-search"
            sx={{
              mr: { xs: '0px', md: '28px' },
              display: {
                md: isTyping ? 'flex' : 'none',
                xs: showInputSearch ? 'flex' : 'none',
              },
            }}
            onClick={() => {
              setIsTyping(false);
              setOpenResults(false);
              setShowInputSearch(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {!isTyping && <Divider />}
    </AppBar>
  );
};

export default HeaderBar;
