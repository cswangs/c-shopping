/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // 开发环境优化
  webpack: (config, { dev, isServer }) => {
    // 开发环境优化
    if (dev && !isServer) {
      // 启用快速刷新
      config.optimization.moduleIds = 'named'
      
      // 减少开发环境的构建时间
      config.optimization.removeAvailableModules = false
      config.optimization.removeEmptyChunks = false
      config.optimization.splitChunks = false
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },

  // 开发服务器配置
  onDemandEntries: {
    // 页面保持活跃的时间（开发环境）
    maxInactiveAge: 25 * 1000,
    // 同时保持活跃的页面数量
    pagesBufferLength: 2,
  },

  // 启用 SWC 编译器
  swcMinify: true,
}

module.exports = nextConfig
