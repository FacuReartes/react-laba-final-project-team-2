'use client'
import React from 'react'
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const ProfileSidebar = () => {
  const router = useRouter()
  const pathName = usePathname()
  
  return (
    <Box sx={{ width: { xs: '250px', lg: '320px' }, display: { xs: 'none', md: 'block' } }}>

      <Box sx={{ ml: { xs: '24px', lg: '40px' }, width:'197px', height:'64px', mt:'37.6px', mb:'32px', display:'flex' }}>
        <Avatar alt='profileAvatar' src='/avatar.svg' sx={{ width: '64px', height: '64px' }}/>
        <Box sx={{ pl: '16px', py: '12px' }}>
          <Typography sx={{ fontSize: '12px', color: '#98A2B3', fontWeight: 500 }}>Welcome</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '18.77px' }}>Jane Meldrum</Typography>
        </Box>
      </Box>

      <Divider/>

      <nav aria-label='profile sidebar'>
        <List sx={{ ml: '8px', mt: '7.6px' }}>
          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }}>
            <ListItemButton onClick={() => router.push('/profile/products')}>
              <ListItemIcon style={pathName === '/profile/products' ?  {color: '#FE645E'} : {}} sx={{ my: '0px'}} >
                <Box component='img' alt='bag-tick' src='/bag-tick.svg'/>
              </ListItemIcon>
              <ListItemText style={pathName === '/profile/products' ?  {color: '#FE645E'} : {}} sx={{ my: '0px'}} primaryTypographyProps={{ fontSize: '16px', lineHeight: '18.77px', fontWeight: 500 }} primary='My products'/>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }} >
            <ListItemButton onClick={() => router.push('/profile/settings')}>
              <ListItemIcon style={pathName === '/profile/settings' ?  {color: '#FE645E'} : {}} sx={{ my: '0px'}}>
                <Box component='img' alt='settings' src='/settings.svg'/>
              </ListItemIcon>
              <ListItemText style={pathName === '/profile/settings' ?  {color: '#FE645E'} : {}} sx={{ my: '0px'}} primaryTypographyProps={{ fontSize: '16px', lineHeight: '18.77px', fontWeight: 500 }} primary='Settings'/>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ mb: '4px', pl: { xs: '0px', lg: '16px' } }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '39px' }}>
                <Box component='img' alt='logout' src='/logout.svg'/>
              </ListItemIcon>
              <ListItemText sx={{ my: '0px' }} primaryTypographyProps={{ fontSize: '16px', lineHeight: '18.77px', fontWeight: 500 }} primary='Log out'/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}

export default ProfileSidebar