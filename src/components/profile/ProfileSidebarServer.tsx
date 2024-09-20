import ProfileSidebar from './ProfileSidebar';
import getInitialUserData from '@/utils/getInitialUserData';

export default async function ProfileSidebarServer() {
  const { userData, jwt } = await getInitialUserData();

  return <ProfileSidebar initialUserData={userData} jwt={jwt} />;
}
