import { Box } from "@mui/material";
import Logo from "@/components/Logo";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import Image from "next/image";

export default function Page() {
  return (
  <Box sx={{ display: 'flex', justifyContent: 'center'}}>
    <Logo />
    <ResetPasswordForm />

     <Box sx={{ position: {md: 'relative'}, display: {md: 'flex', xs: 'none'} }}>
        <Image src="/sneakers-reset-password.svg" alt="Sneakers" width={961} height={962} />
      </Box>
  </Box>
  )
}