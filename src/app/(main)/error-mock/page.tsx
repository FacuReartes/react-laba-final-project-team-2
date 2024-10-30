'use client';
import { useEffect } from 'react';

export default function ErrorMock() {
  useEffect(() => {
    throw new Error('Simulating a server-side error.');
  }, []);

  return <div>Error triggered!</div>;
}
