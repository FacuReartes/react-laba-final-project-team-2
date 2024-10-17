'use client';
import { APIProductsType } from '@/lib/apiDataTypes';
import { SnackbarCloseReason } from '@mui/material';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface IWishListContext {
  wishList: APIProductsType[];
  addWish: (product: APIProductsType) => void;
  removeWish: (productId: string | number) => void;
  isSuccess: boolean;
  message: string;
  handleClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

export const WishListContext = createContext<IWishListContext | null>(null);

const WishListProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [wishList, setWishList] = useState<APIProductsType[]>([]);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const storage: string | null = localStorage.getItem('wishlist');
    if (storage) setWishList(JSON.parse(storage));
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSuccess(false);
  };

  const addWish = useCallback((product: APIProductsType) => {
    setWishList((prevWishList: APIProductsType[]) => {
      const isAlreadyInWishList = prevWishList.some(
        wish => wish.id === product.id
      );

      if (!isAlreadyInWishList) {
        const updatedWishList = [...prevWishList, product];
        setMessage('New product has been added to the wishlist successfully');
        setIsSuccess(true);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
        return updatedWishList;
      }

      setMessage('You already have this product in your wishlist');
      return prevWishList;
    });
  }, []);

  const removeWish = useCallback((productId: string | number) => {
    setWishList((prevWishList: APIProductsType[]) => {
      const newWishList = prevWishList.filter(wish => wish.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(newWishList));
      return newWishList;
    });
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addWish,
        removeWish,
        isSuccess,
        handleClose,
        message,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;
