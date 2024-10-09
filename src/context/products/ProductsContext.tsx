import React, { createContext, ReactNode, useContext, useState } from 'react';

import { APIProductsType } from '@/lib/apiDataTypes';

interface ProductsContextType {
  products: APIProductsType[];
  setProducts: (products: APIProductsType[]) => void;
}
interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<APIProductsType[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
