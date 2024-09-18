import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { SignInFormInputs } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export const useSignIn = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginOk, setIsLoginOk] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (data: SignInFormInputs) => {
    setIsLoading(true);
    try {
      await axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
        {
          identifier: data.email,
          password: data.password,
        }
      );

      await signIn('credentials', {
        redirect: true,
        callbackUrl: '/profile/products',
        identifier: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      setIsLoginOk(true);
      // setOpenDialog(true);
      // setMessage('User logged in successfully');
    } catch (error) {
      setOpenDialog(true);
      setIsLoginOk(false);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.error.message || 'An error occurred';
        setMessage(errorMessage);
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    if (isLoginOk) {
      router.push('/cart');
    }
  };

  return {
    openDialog,
    message,
    isLoading,
    isLoginOk,
    handleSignIn,
    closeDialog,
  };
};
