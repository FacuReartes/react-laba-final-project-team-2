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
};

export default nextConfig;
