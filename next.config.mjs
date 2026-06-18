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
};

export default nextConfig;
