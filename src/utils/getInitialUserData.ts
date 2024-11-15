import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { env } from '../../env';

export default async function getInitialUserData() {
  const session = await getServerSession(authOptions);
  let userData = null;

  if (session?.user?.jwt) {
    try {
      const response = await fetch(`${env.BASE_URL}/users/me?populate=*`, {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
        },
      });
      userData = await response.json();
    } catch (error) {
      console.log('Error while fetching user data:', error);
    }
  }

  return { userData, jwt: session?.user?.jwt };
}
