/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "venturebeat.com",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
      },
      {
        protocol: "https",
        hostname: "ynet-pic1.yit.co.il", // ✅ Added this
      },
    ],
  },
};

export default nextConfig;
