import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useUploadAvatar = (jwt: string | undefined) => {
  const [avatarData, setAvatarData] = useState<object | null>(null);

  const { mutate, ...rest } = useMutation({
    mutationFn: (file: File) => {
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
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        console.error(
          error?.response?.data.error?.message || 'Something went wrong'
        );
      } else {
        console.error('Error:', error.message || 'Something went wrong');
      }
    },
  });

  return { avatarData, mutate, ...rest };
};
