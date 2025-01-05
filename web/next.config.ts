import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md'],
  crossOrigin: 'anonymous',

};

export default nextConfig