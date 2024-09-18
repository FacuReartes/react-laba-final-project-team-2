import SettingsForm from './SettingsForm';
import getInitialUserData from '@/utils/getInitialUserData';

export default async function SettingsFormServer() {
  const userData = await getInitialUserData();

  return <SettingsForm initialUserData={userData} />;
}
