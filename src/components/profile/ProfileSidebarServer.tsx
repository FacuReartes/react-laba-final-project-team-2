import ProfileSidebar from './ProfileSidebar';
import getInitialUserData from '@/utils/getInitialUserData';

export default async function ProfileSidebarServer() {
  const userData = await getInitialUserData();

  return <ProfileSidebar initialUserData={userData} />;
}
