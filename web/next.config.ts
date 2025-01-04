import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  // Optionally, you can add MDX-specific config here
});

    