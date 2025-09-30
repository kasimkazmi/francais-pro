/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TerserPlugin = require('terser-webpack-plugin');

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  // Remove console logs in production builds
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        })
      );
    }
    return config;
  },
}

module.exports = nextConfig
