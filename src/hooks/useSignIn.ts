import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
    setOpenDialog(true);
    if (result?.error) {
      setIsLoginOk(false);
      setMessage('Invalid email or password');
    } else {
      setIsLoginOk(true);
      setMessage('User logged in successfully');
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    if (isLoginOk) {
      router.push('/bag');
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
