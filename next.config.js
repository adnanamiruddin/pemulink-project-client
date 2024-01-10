/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "odtdofpkanalskvwidgy.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
