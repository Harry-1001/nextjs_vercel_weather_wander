// next.config.ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,  // ESMの外部モジュールを有効にする設定
  },
};

export default nextConfig;
