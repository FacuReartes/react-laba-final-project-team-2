'use client'
import SignupCard from "@/components/SignupCard";
import SignupForm from "@/components/SignupForm";
import Logo from "@/components/Logo";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";

export default function Page() {  
  const isDesktop = useMediaQuery('(min-width: 700px)');
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Logo />
      <SignupForm />
      
      {isDesktop && <Box sx={{ position: 'relative' }}>
        <Image src="/sneakers-signup.svg" alt="Sneakers" width={961} height={962} />
        <SignupCard />
      </Box>}
    </Box>
  )
}