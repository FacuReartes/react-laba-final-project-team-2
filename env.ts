export const env = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

if (!env.BASE_URL) {
  throw new Error('BASE_URL is not defined');
}
