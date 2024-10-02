import { env } from '../../env';

const URL = `${env.BASE_URL}`;

export const fetchDataFromAPI = async (path: string) => {
  const response = await fetch(URL + path);
  if (!response.ok) throw new Error('Failed to fetch genders');
  return await response.json();
};
