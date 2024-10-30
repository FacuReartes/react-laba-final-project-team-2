import { getServerSession } from 'next-auth';
import ProfileSidebar from './ProfileSidebar';
import { authOptions } from '@/lib/authOptions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import useUserQuery from '@/hooks/useUserQuery';

export default async function ProfileSidebarServer() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.jwt;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUserQuery(token));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSidebar />
    </HydrationBoundary>
  );
}
