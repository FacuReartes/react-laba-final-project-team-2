'use client'
import { Box, useMediaQuery } from "@mui/material";
import Logo from "@/components/Logo";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import Image from "next/image";

export default function Page() {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
    <Logo />
    <ResetPasswordForm />

     {isDesktop && <Box sx={{ position: 'relative' }}>
        <Image src="/sneakers-reset-password.svg" alt="Sneakers" width={961} height={962} />
      </Box>}
  </Box>
  )
}