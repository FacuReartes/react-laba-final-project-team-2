import { Close, Login } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Popup from '../Popup';
import { useLogOut } from '@/hooks/auth/useLogOut';

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  '& .MuiMenu-list': {
    padding: '80px 0px 0px 32px',
  },
  '& > .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)',
  },
}));

const HeaderMenu = (props: { showInputSearch: boolean }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleItemClick = (route: string): void => {
    handleClose();
    router.push(`/profile/${route}`);
  };

  const { handleLogOut, openDialog, setOpenDialog, message, isLoading } =
    useLogOut();

  return (
    <>
      <IconButton
        aria-label="hamburger"
        sx={{
          mr: { xs: '0px', md: '28px' },
          display: props.showInputSearch ? 'none' : { xs: 'flex', md: 'none' },
        }}
        aria-controls={open ? 'header-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image alt="hamburger" src="/hamburger.svg" width={20} height={21} />
      </IconButton>

      <StyledMenu
        id="header-menu"
        aria-labelledby="header-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        marginThreshold={0}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 'none',
              width: { xs: '72vw', sm: '45vw' },
              height: '100vh',
              right: '0px !important',
              top: '0px !important',
              left: 'unset !important',
              borderRadius: 'unset',
            },
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ position: 'absolute', top: '18px', right: '8px' }}
        >
          <Close sx={{ fontSize: 20, padding: '6px' }} />
        </MenuItem>

        {session ? (
          <Box>
            <MenuItem
              onClick={() => handleItemClick('products')}
              sx={{ py: '18px' }}
            >
              {pathName === '/profile/products' ? (
                <Image
                  src="/sidebar-icons/bag-tick-red.svg"
                  alt="bag-tick-red"
                  width={20}
                  height={21}
                />
              ) : (
                <Image
                  src="/sidebar-icons/bag-tick.svg"
                  alt="bag-tick"
                  width={20}
                  height={21}
                />
              )}
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                  color:
                    pathName === '/profile/products' ? 'secondary.light' : '',
                }}
              >
                My products
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => handleItemClick('order-history')}
              sx={{ py: '18px' }}
            >
              {pathName === '/profile/order-history' ? (
                <Image
                  src="/sidebar-icons/order-history-red.svg"
                  alt="order-history-red"
                  width={20}
                  height={21}
                />
              ) : (
                <Image
                  src="/sidebar-icons/order-history.svg"
                  alt="order-history"
                  width={20}
                  height={21}
                />
              )}
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                  color:
                    pathName === '/profile/order-history'
                      ? 'secondary.light'
                      : '',
                }}
              >
                Order history
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => handleItemClick('wishlist')}
              sx={{ py: '18px' }}
            >
              {pathName === '/profile/wishlist' ? (
                <Image
                  src="/sidebar-icons/wishlist-red.svg"
                  alt="wishlist-red"
                  width={20}
                  height={21}
                />
              ) : (
                <Image
                  src="/sidebar-icons/wishlist.svg"
                  alt="wishlist"
                  width={20}
                  height={21}
                />
              )}
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                  color:
                    pathName === '/profile/wishlist' ? 'secondary.light' : '',
                }}
              >
                My Wishlist
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => handleItemClick('recently-viewed')}
              sx={{ py: '18px' }}
            >
              {pathName === '/profile/recently-viewed' ? (
                <Image
                  src="/sidebar-icons/recently-viewed-red.svg"
                  alt="recently-viewed-red"
                  width={20}
                  height={21}
                />
              ) : (
                <Image
                  src="/sidebar-icons/recently-viewed.svg"
                  alt="recently-viewed"
                  width={20}
                  height={21}
                />
              )}
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                  color:
                    pathName === '/profile/recently-viewed'
                      ? 'secondary.light'
                      : '',
                }}
              >
                Recently Viewed
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => handleItemClick('settings')}
              sx={{ py: '18px' }}
            >
              {pathName === '/profile/settings' ? (
                <Image
                  src="/sidebar-icons/settings-red.svg"
                  alt="settings-red"
                  width={20}
                  height={21}
                />
              ) : (
                <Image
                  src="/sidebar-icons/settings.svg"
                  alt="settings"
                  width={20}
                  height={21}
                />
              )}
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                  color:
                    pathName === '/profile/settings' ? 'secondary.light' : '',
                }}
              >
                Settings
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={handleLogOut}
              sx={{ py: '18px' }}
              disabled={isLoading}
            >
              <Image
                src="/sidebar-icons/logout.svg"
                alt="logout"
                width={20}
                height={21}
              />
              <Typography
                sx={{
                  pl: '15px',
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                }}
              >
                Log out
              </Typography>
            </MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={() => router.push('/auth/sign-in')}>
            <Login sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                pl: '15px',
                fontSize: '16px',
                lineHeight: '18.77px',
                fontWeight: 500,
              }}
            >
              Sign in
            </Typography>
          </MenuItem>
        )}
      </StyledMenu>
      <Popup open={openDialog} onClose={setOpenDialog} title={message} />
    </>
  );
};

export default HeaderMenu;
