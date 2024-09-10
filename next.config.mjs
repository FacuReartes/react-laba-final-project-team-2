/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.farfetch-contents.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'nikearprod.vtexassets.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        source: '/',
        destination: '/auth/sign-in',
        permanent: true,
      },
    ],
  },
};

export default nextConfig;
