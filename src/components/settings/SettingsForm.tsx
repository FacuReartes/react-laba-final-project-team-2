'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import SettingsCard from './SettingsCard'

// type Props = {}

const SettingsForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Box sx={{ width: isDesktop ? '436px' : '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: isDesktop ? '52px' : '24px', pb: '91px', bgcolor: '#fff'}}>
        <Typography variant={isDesktop ? 'h1' : 'h2'} sx={{alignSelf: 'flex-start', ml: {xs: '34px', md: '29px'}}}>My Profile</Typography>
        <SettingsCard />
        <Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ mb: '48px', px: {xs: '20px', md: '0'} }}>Welcome back! Please enter your details to log into your account.</Typography>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: isDesktop ? '436px' : '320px' }}>
          <TextField type="text" id="outlined-basic" label="Name" variant="outlined" placeholder="Jane" sx={{ height: '48px' }} />
          <TextField type="text" id="outlined-basic" label="Surname" variant="outlined" placeholder="Meldrum" sx={{ height: '48px' }} />
          <TextField type="email" id="outlined-basic" label="Email" variant="outlined" placeholder="example@mail.com" sx={{ height: '48px' }} />
          <TextField type="tel" id="outlined-basic" label="Phone number" variant="outlined" placeholder="(949) 354-2574" sx={{ height: '48px' }} />

          <Button type="submit" variant="contained" color='error' sx={{ color: '#fff', width: '152px', height: '40px', mt: '56px', alignSelf: 'flex-end' }}>Save changes</Button>
        </form>
      </Box>
  )
}

export default SettingsForm