import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    // ppr: "incremental",
    useCache: true,
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/_next/static/chunks/app/:folder*/@modal/:path*",
        destination: "/_next/static/chunks/app/:folder*/%40modal/:path*",
      },
      {
        source: "/_next/static/chunks/app/@modal/:path*",
        destination: "/_next/static/chunks/app/%40modal/:path*",
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    HONEYCOMB_API_KEY: process.env.HONEYCOMB_API_KEY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
