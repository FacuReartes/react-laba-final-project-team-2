import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useUploadAvatar = (jwt: string | undefined) => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('files', file);

      return axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            // 'Content-Type': 'multipart/form-data',
          },
        }
      );
    },
    onSuccess: () => console.log('Avatar uploaded successfully'),
    onError: error => console.error(error),
  });
};
