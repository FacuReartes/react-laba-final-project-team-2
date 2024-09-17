import { IUser } from '@/lib/next-auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (jwt: string | undefined) => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get<IUser>(
        'https://shoes-shop-strapi.herokuapp.com/api/users/me?populate=*',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
