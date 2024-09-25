import Header from '@/components/common/Header/Header';
import useUserQuery from '@/hooks/useUserQuery';
import { authOptions } from '@/lib/authOptions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: {
    default: 'Main',
    template: '%s | Main',
  },
  description: 'Main page',
};

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
