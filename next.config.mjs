/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.farfetch-contents.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nikearprod.vtexassets.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
