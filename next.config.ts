import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = basePath ? `${basePath}/` : '';

const nextConfig: NextConfig = {
  basePath,
  assetPrefix,
};

export default nextConfig;
