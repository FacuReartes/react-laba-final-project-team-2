import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useUploadAvatar = (jwt: string | undefined) => {
  const [avatarData, setAvatarData] = useState<object | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { mutate, ...rest } = useMutation({
    mutationFn: (file: File) => {
      if (!file.type.startsWith('image/')) {
        throw new Error('Error: File must be an image.');
      }
      const formData = new FormData();
      formData.append('files', file);

      return axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    },
    onSuccess: data => {
      setAvatarData(data.data[0]);
      setOpenDialog(true);
      setMessage('Avatar updated. Click Save changes button to apply changes');
    },
    onError: error => {
      if (error.message === 'Error: File must be an image.') {
        setOpenDialog(true);
        setMessage('Only images are allowed. Pick an image file.');
      } else if (axios.isAxiosError(error)) {
        setOpenDialog(true);
        setMessage(
          error?.response?.data.error?.message || 'Something went wrong'
        );
      } else {
        setOpenDialog(true);
        setMessage('Something went wrong');
      }
    },
  });

  return { avatarData, mutate, openDialog, message, setOpenDialog, ...rest };
};
