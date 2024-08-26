'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Page() {  
  const isDesktop = useMediaQuery('(min-width: 700px)');
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Image src="/logo.svg" alt="logo" width={40} height={30} style={{ position: 'absolute', left: isDesktop ? '40px' : '20px', top: isDesktop ? '50px' : '18px' }} />
      <Box sx={{ width: isDesktop ? '960px' : '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: isDesktop ? '288px' : '94px', bgcolor: '#fff'}}>
        <Typography variant={isDesktop ? "h1" : "h2"}>Create an account</Typography>
        <Typography variant={isDesktop ? "subtitle1" : "subtitle2"} sx={{ mb: '48px', pl: '20px' }}>Create an account to get an easy access to your dream shopping</Typography>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: isDesktop ? '436px' : '320px' }}>
          <TextField id="outlined-basic" label="Name *" variant="outlined" placeholder="Hayman Andrews" sx={{ height: '48px' }} />
          <TextField id="outlined-basic" label="Email *" variant="outlined" placeholder="example@mail.com" sx={{ height: '48px' }} />
          <TextField id="outlined-basic" label="Password *" variant="outlined" placeholder="at least 8 characters" sx={{ height: '48px' }} />
          <TextField id="outlined-basic" label="Confirm Password *" variant="outlined" placeholder="at least 8 characters" sx={{ height: '48px' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', mt: '90px' }}>
            <Button type="submit" variant="contained" color='error' sx={{ color: '#fff', width: '100%', height: '48px' }}>Sign Up</Button>
            <Typography variant="subtitle1" color={'#000'}>Already have an account? <Link style={{textDecoration: 'none', color: '#FE645E', fontWeight: '500'}} href="/login">Log in</Link></Typography>
          </Box>
        </form>
      </Box>

      {isDesktop && <Box sx={{ position: 'relative' }}>
        <Image src="/sneakers-signup.svg" alt="Sneakers" width={961} height={962} />
        <Box sx={{ position: 'absolute', width: '756px', height: '317px', backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, #FFFFFF 100%)', borderRadius: '16px', right: '%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h3" sx={{ p: '57px 137px 24px 69px' }}>Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.</Typography>
          <Box sx={{ position: 'absolute', right: '45px', top: '63px', width: '108px', height: '38px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
            <ArrowBackIosIcon sx={{  cursor: 'pointer' }} /><ArrowForwardIosIcon sx={{ cursor: 'pointer' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="h3" sx={{ fontWeight: '700', pl: '69px' }}>John Stone</Typography>
            <StarIcon color="error" />
            <StarIcon color="error" />
            <StarIcon color="error" />
            <StarIcon color="error" />
            <StarIcon color="error" />
          </Box>
          <Typography variant="subtitle1" sx={{ pl: '69px' }}>Ukraine, Chernivtsi</Typography>
        </Box>
      </Box>}
      </Box>
  )
}