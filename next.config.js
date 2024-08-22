const { runtime } = require('./pages/_document');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  serverRuntimeConfig: {
    runtime:'edge',
  },
};

module.exports = nextConfig;
