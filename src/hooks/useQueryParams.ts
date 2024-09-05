'use client';

import { useSearchParams } from 'next/navigation';

const useQueryParams = (parameterName: string): string | null => {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get(parameterName);

  return paramValue;
};

export default useQueryParams;
