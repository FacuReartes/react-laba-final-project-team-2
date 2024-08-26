import React from 'react'
import { AppBar, Box, Button, Divider, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position='static' sx={{ bgcolor: '#FFF', height: { xs: '64px', md: '120px' }, boxShadow: 0 }}>
      <Toolbar sx={{ height: '100%' }}>

        <Box sx={{ ml: {xs: '4px' , md: '16px'} }} component='img' alt='logo' src='/logo.svg'/>

        <Typography sx={{ color: '#000', fontWeight: '500', ml: '44px', flexGrow: 1, visibility: { xs: 'hidden', md: 'visible' }}}>Products</Typography>

        <Button variant='outlined' sx={{ mr: '40px', color: 'secondary.light', borderColor: 'secondary.light', width: '145px', height: '48px', fontSize: '12px', 
        display: { xs: 'none', md:'flex' }, ':hover': { borderColor: '#fff', color: '#FFF', bgcolor: 'secondary.light' }}}>Sign in</Button>

        <TextField label='Search' id='search-field' variant='outlined' size='small' 
        sx={{ input: { color:'#000', height: '30px' }, mr: '40px', width: '320px', display: { xs:'none', md:'flex' }}}
        InputLabelProps={{
          style: { color: '#5C5C5C' }
        }}
        InputProps={{
          style: { borderRadius: '50px', color: '#000' },
          startAdornment: (
            <InputAdornment position='start'>
              <Box component='img' alt='search' src='/search.svg'/>
            </InputAdornment>
          )
        }}/>

        <IconButton aria-label='bag' sx={{ mr: {xs: '4px', md: '28px' }}}>
          <Box component='img' alt='bag' src='/bag.svg'/>
        </IconButton>

        <IconButton aria-label='search-mobile' sx={{ mr: {xs: '4px', md: '28px' }, display: { xs: 'flex', md: 'none' }}}>
          <Box component='img' alt='search-mobile' src='/search.svg' sx={{ height: '20px', width: '20px' }}/>
        </IconButton>

        <IconButton aria-label='hamburger' sx={{ mr: {xs: '0px', md: '28px' }, display: { xs: 'flex', md:'none' } }}>
          <Box component='img' alt='hamburger' src='/hamburger.svg'/>
        </IconButton>

      </Toolbar>
      <Divider/>
    </AppBar>
  )
}

export default Header