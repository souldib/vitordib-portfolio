import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // TypeScript 7 ships only the CLI, not the legacy compiler API Next expects.
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
