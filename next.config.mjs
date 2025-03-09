// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    domains: ['cdn.sanity.io'], // Ref: https://github.com/vercel/next.js/discussions/60803#discussioncomment-8165517
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  }
}

export default withPlaiceholder(nextConfig);
