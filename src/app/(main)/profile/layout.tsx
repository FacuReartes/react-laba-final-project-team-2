import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: 
  Readonly<{ children: React.ReactNode }>) {
  
  const session = await getServerSession();
  if (!session) redirect('/auth/sign-in')

  return (
    <Box sx={{ display: 'flex' }}>
      <ProfileSidebar />
      {children}
    </Box>
  );
}
