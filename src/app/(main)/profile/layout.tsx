import ProfileSidebar from "@/components/ProfileSidebar";
import { Box } from "@mui/material";

export default function Layout({ children }:
  Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: 'flex' }}>
      <ProfileSidebar/>
      {children}
    </Box>
  )
}