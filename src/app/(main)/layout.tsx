'use client';
import Header from '@/components/common/header/Header';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
