import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //https://i.ytimg.com/vi/IKp_qWvX4Pc/default.jpg
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
