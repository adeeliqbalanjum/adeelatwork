/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/adeelatwork' : '',
  assetPrefix: isGithubActions ? '/adeelatwork/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? '/adeelatwork' : '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
