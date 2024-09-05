import { SettingsFormData } from '@/lib/definitions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateUser = (
  userId: string | undefined,
  jwt: string | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SettingsFormData) => {
      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
