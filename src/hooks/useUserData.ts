import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (jwt: string | undefined) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return axios.get(
        'https://shoes-shop-strapi.herokuapp.com/api/users/me?populate=*',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    },
  });
};
