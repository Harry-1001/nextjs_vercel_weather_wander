//import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,  // ESMの外部モジュールを有効にする設定
  },
};

module.exports = nextConfig;
