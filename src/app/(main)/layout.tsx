import Header from '@/components/common/Header/Header';
import useUserQuery from '@/hooks/useUserQuery';
import { authOptions } from '@/lib/authOptions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  const token = session?.user?.jwt;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUserQuery(token));
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
      </HydrationBoundary>
      {children}
    </>
  );
}
