/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
      NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
      LIVEBLOCKS_PRIVATE_KEY:process.env.LIVEBLOCKS_PRIVATE_KEY
    },
};

export default nextConfig;
