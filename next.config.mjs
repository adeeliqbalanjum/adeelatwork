/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/portfolio-v4' : '',
  assetPrefix: isGithubActions ? '/portfolio-v4/' : '',
};

export default nextConfig;
