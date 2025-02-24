import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    const { isServer } = options;
    const remotes = {
      remote: `remote@http://localhost:3001/_next/static/${
        isServer ? "ssr" : "chunks"
      }/remoteEntry.js`,
      basket: `basket@http://localhost:3002/mf-manifest.json`,
    };
    const federatedConfig = {
      name: "host",
      filename: "static/chunks/remoteEntry.js",
      remotes: remotes,
      exposes: {
        "./hostStore": "./src/store/index",
      },
      shared: ["react", "react-dom", "@reduxjs/toolkit", "react-redux"],
    };
    config.plugins.push(new NextFederationPlugin(federatedConfig));
    return config;
  },
};

export default nextConfig;
