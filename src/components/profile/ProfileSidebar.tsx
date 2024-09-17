'use client';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useUserData } from '@/hooks/useUserData';
import Popup from '../common/Popup';
import { useLogOut } from '@/hooks/useLogOut';
import { IUser } from '@/lib/next-auth';

const ProfileSidebar = ({ initialUserData }: { initialUserData: IUser }) => {
  const router = useRouter();
  const pathName = usePathname();
  const session = useSession();
  const jwt = session.data?.user.jwt;

  const { data: userData } = useUserData(jwt, initialUserData);

  const { openDialog, setOpenDialog, message, isLoading, handleLogOut } =
    useLogOut();

  return (
    <Box
      sx={{
        width: { xs: '250px', lg: '320px' },
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          ml: { xs: '24px', lg: '40px' },
          width: '197px',
          height: '64px',
          mt: '37.6px',
          mb: '32px',
          display: 'flex',
        }}
      >
        <Avatar
          alt="profileAvatar"
          src={userData?.avatar?.url}
          sx={{ width: '64px', height: '64px' }}
        />
        <Box sx={{ pl: '16px', py: '12px' }}>
          <Typography
            sx={{ fontSize: '12px', color: '#98A2B3', fontWeight: 500 }}
          >
            Welcome
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '18.77px' }}
          >
            {userData?.firstName || userData?.username} {userData?.lastName}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <nav aria-label="profile sidebar">
        <List sx={{ ml: '8px', mt: '7.6px' }}>
          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }}>
            <ListItemButton onClick={() => router.push('/profile/products')}>
              <ListItemIcon sx={{ my: '0px' }}>
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
              </ListItemIcon>
              <ListItemText
                style={
                  pathName === '/profile/products' ? { color: '#FE645E' } : {}
                }
                sx={{ my: '0px' }}
                primaryTypographyProps={{
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                }}
                primary="My products"
              />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }}>
            <ListItemButton onClick={() => router.push('/profile/settings')}>
              <ListItemIcon sx={{ my: '0px' }}>
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
              </ListItemIcon>
              <ListItemText
                style={
                  pathName === '/profile/settings' ? { color: '#FE645E' } : {}
                }
                sx={{ my: '0px' }}
                primaryTypographyProps={{
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                }}
                primary="Settings"
              />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }}>
            <ListItemButton onClick={handleLogOut} disabled={isLoading}>
              <ListItemIcon sx={{ my: '0px' }}>
                <Image
                  src="/sidebar-icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={21}
                />
              </ListItemIcon>
              <ListItemText
                sx={{ my: '0px' }}
                primaryTypographyProps={{
                  fontSize: '16px',
                  lineHeight: '18.77px',
                  fontWeight: 500,
                }}
                primary="Log out"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Popup open={openDialog} onClose={setOpenDialog} title={message} />
    </Box>
  );
};

export default ProfileSidebar;
