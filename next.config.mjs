/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/login',
        destination: '/login',
      },
      {
        source: '/auth/register',
        destination: '/register',
      },
    ];
  },
};

export default nextConfig;

