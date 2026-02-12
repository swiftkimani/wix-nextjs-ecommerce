/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['fs'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com"
      },
    ]
  }
};

export default nextConfig;
