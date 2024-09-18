import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import SettingsFormClient from './SettingsFormClient';
import { useUserDataServer } from '@/hooks/useUserDataServer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function SettingsFormSSR() {
  const session = await getServerSession(authOptions);
  const jwt = session?.user?.jwt;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUserDataServer(jwt));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsFormClient />
    </HydrationBoundary>
  );
}
