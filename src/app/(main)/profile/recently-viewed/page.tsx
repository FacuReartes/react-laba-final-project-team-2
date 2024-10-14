import RecentlyViewedContainer from '@/components/recentlyViewed/RecentlyViewedContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recently Viewed',
  description: 'Recently Viewed',
};

export default function Page() {
  return <RecentlyViewedContainer />;
}
