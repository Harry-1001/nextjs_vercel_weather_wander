// next.config.tsgit add next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,  // App Router を有効化
  },
};

export default nextConfig;

