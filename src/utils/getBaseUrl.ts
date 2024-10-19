export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_URL}`
  }
  console.log(process.env.VERCEL_URL)
  return `https://${process.env.VERCEL_URL}`;
};