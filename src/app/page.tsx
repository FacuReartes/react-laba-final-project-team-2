'use client';
import HomePageContainer from '@/components/home/HomePageContainer';
import { ProductsProvider } from '@/context/ProductsContext';

interface HomeProps {
  searchParams: {
    search?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const searchQuery = searchParams.search || '';
  console.log('searchQuery:', searchQuery);

  return (
    <ProductsProvider>
      <HomePageContainer initialSearchTerm={searchQuery} />
    </ProductsProvider>
  );
}
