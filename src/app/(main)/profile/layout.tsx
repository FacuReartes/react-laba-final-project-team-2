import ProfileSidebarServer from '@/components/profile/ProfileSidebarServer';
import { authOptions } from '@/lib/authOptions';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/sign-in');

  return (
    <Box sx={{ display: 'flex' }}>
      <ProfileSidebarServer />
      {children}
    </Box>
  );
}
