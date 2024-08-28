'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'

// type Props = {}

const ResetPasswordForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Box sx={{ width: isDesktop ? '960px' : '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: isDesktop ? '288px' : '94px', bgcolor: '#fff'}}>
        <Typography variant={isDesktop ? 'h1' : 'h2'}>Reset password</Typography>
        <Typography variant={isDesktop ? 'subtitle1' : 'subtitle2'} sx={{ mb: '48px', pl: '20px' }}>Please create a new password here</Typography>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: isDesktop ? '436px' : '320px' }}>
          <TextField id="outlined-basic" label="Password *" variant="outlined" placeholder="at least 8 characters" sx={{ height: '48px' }} />
          <TextField id="outlined-basic" label="Confirm Password *" variant="outlined" placeholder="at least 8 characters" sx={{ height: '48px' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', mt: '90px' }}>
            <Button type="submit" variant="contained" color='error' sx={{ color: '#fff', width: '100%', height: '48px' }}>Reset password</Button>
            <Link style={{textDecoration: 'none', color: '#494949', fontWeight: '500'}} href="/login">Back to login</Link>
          </Box>
        </form>
      </Box>
  )
}

export default ResetPasswordForm