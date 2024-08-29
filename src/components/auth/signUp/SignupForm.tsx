'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material"
import Link from "next/link"

type Props = {}

const SignupForm = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
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
            <Typography variant="subtitle1" color={'#000'}>Already have an account? <Link style={{textDecoration: 'none', color: '#FE645E', fontWeight: '500'}} href="/sign-in">Log in</Link></Typography>
          </Box>
        </form>
      </Box>
  )
}

export default SignupForm