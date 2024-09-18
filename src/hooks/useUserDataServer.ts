import { IUser } from '@/lib/next-auth';
import axios from 'axios';

export const useUserDataServer = (jwt: string | undefined) => {
  const queryKey = ['user'];
  const queryFn = async () => {
    const response = await axios.get<IUser>(
      'https://shoes-shop-strapi.herokuapp.com/api/users/me?populate=*',
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  };

  return {
    queryKey,
    queryFn,
  };
};
