import { APIProductsType } from '@/lib/apiDataTypes';
import { useEffect, useState } from 'react'

export const useRecentlyViewed = (product?: APIProductsType) => {
  const [productList, setProductList] = useState<APIProductsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Get list from local storage
    let productListStorage: APIProductsType[] = [];
    const storage: string | null = localStorage.getItem('recently-watched');
    if (storage) productListStorage = JSON.parse(storage);

    // If we are viewing a product
    if (product) {

      // Filter out existing product 
      productListStorage = productListStorage.filter(
        (listProduct: APIProductsType) => listProduct.id !== product.id
      );

      // Add product to beginning of list
      productListStorage.unshift(product);

      // If list exceeds the limit, delete last product from the list
      if (productListStorage.length > 12) productListStorage.pop();

      // Save to local storage
      localStorage.setItem('recently-watched', JSON.stringify(productListStorage));
    }

    setProductList(productListStorage);
    setIsLoading(false)

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    productList,
    isLoading
  }
}