import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLogOut = () => {
  // const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: '/', redirect: true });
      // setOpenDialog(true);
      // setMessage('User logged out successfully');

      // setTimeout(() => {
      //   router.push('/auth/sign-in');
      // }, 2000);
    } catch (error) {
      console.error(error);
      setOpenDialog(true);
      setMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openDialog,
    setOpenDialog,
    message,
    isLoading,
    handleLogOut,
  };
};
