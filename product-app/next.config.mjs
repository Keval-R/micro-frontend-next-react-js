import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    const federatedConfig = {
      name: "remote",
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./ProductList": "./src/component/ProductList/index",
        "./productApi": "./src/api/productApi",
      },
      remotes: {
        host: `host@http://localhost:3000/_next/static/${
          isServer ? "ssr" : "chunks"
        }/remoteEntry.js`,
      },
      shared: ["react", "react-dom", "@reduxjs/toolkit", "react-redux"],
    };
    config.plugins.push(new NextFederationPlugin(federatedConfig));
    return config;
  },
};

export default nextConfig;
