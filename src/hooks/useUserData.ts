import { IUser } from '@/lib/next-auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../env';

export const useUserData = (jwt: string | undefined, initialData?: IUser) => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get<IUser>(
        `${env.BASE_URL}/users/me?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    },
    enabled: Boolean(jwt),
    staleTime: 1000 * 60 * 5,
    initialData: initialData,
  });
};
