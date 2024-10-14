'use client';
import { APIProductsType } from '@/lib/apiDataTypes';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export interface ICartProduct {
  id: number;
  name: string;
  images?: File[];
  imageUrl: string;
  description?: string;
  price: number;
  gender: number | string;
  sizes: number | string;
  color?: number | string;
  brand?: number | string;
  quantity: number;
}

enum QuantityAction {
  plus = 'plus',
  minus = 'minus',
}

export interface ICartContext {
  cartList: ICartProduct[];
  setCartList: (newList: ICartProduct[]) => void;
  handleAddToCart: (
    product: APIProductsType,
    selectedSize: number | string
  ) => void;
  handleQuantity: (
    productID: number,
    selectedSize: number | string,
    action: QuantityAction
  ) => void;
  handleDelete: (productID: number, selectedSize: number | string) => void;
  loading: boolean;
}

export const CartContext = createContext<ICartContext | null>(null);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartList, setCartList] = useState<ICartProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storage: string | null = localStorage.getItem('cart-list');
    if (storage) setCartList(JSON.parse(storage));
    setLoading(false);
  }, []);

  const handleAddToCart = (
    product: APIProductsType,
    selectedSize: number | string
  ): void => {
    let newList: ICartProduct[] = [...cartList];

    const existingProduct: ICartProduct | undefined = newList.find(
      (cartProduct: ICartProduct) =>
        cartProduct.id === product.id && cartProduct.sizes === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct: ICartProduct = {
        id: product.id,
        name: product.attributes.name,
        imageUrl: product.attributes.images.data[0].attributes.url,
        price: product.attributes.price,
        gender: product.attributes.gender.data.attributes.name,
        sizes: selectedSize,
        quantity: 1,
      };

      newList = [...newList, newProduct];
    }

    setCartList(newList);

    localStorage.setItem('cart-list', JSON.stringify(newList));
  };

  const handleQuantity = (
    productID: number,
    selectedSize: number | string,
    action: QuantityAction
  ): void => {
    const newList: ICartProduct[] = [...cartList];

    newList.forEach((product: ICartProduct) => {
      if (product.id === productID && product.sizes === selectedSize) {
        if (action === QuantityAction.plus) {
          product.quantity += 1;
        } else {
          if (product.quantity !== 1) {
            product.quantity -= 1;
          }
        }
      }
    });

    setCartList(newList);

    localStorage.setItem('cart-list', JSON.stringify(newList));
  };

  const handleDelete = (
    productID: number,
    selectedSize: number | string
  ): void => {
    const newList: ICartProduct[] = cartList.filter(
      (product: ICartProduct) =>
        !(product.id === productID && product.sizes === selectedSize)
    );

    setCartList(newList);

    localStorage.setItem('cart-list', JSON.stringify(newList));
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        loading,
        handleAddToCart,
        handleDelete,
        handleQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
