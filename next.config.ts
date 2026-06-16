import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 移除静态导出以支持 SSR（认证和 API 路由需要）
  // output: 'export',
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
