const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const packageJson = require("./package.json");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        search: "",
      },
    ],
  },
  webpack: (config: { resolve: { alias: any; fallback: any }; plugins: any[]; experiments: { topLevelAwait: boolean; }; }, { isServer }: any) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          nextApp:
            `nextApp@http://localhost:3001/_next/static/${isServer ? "ssr" : "chunks"
            }/remoteEntry.js`,
          reactApp: "reactApp@http://localhost:3002/remoteEntry.js",
        },
        exposes: {
          "./store": "./src/store",
        },
        shared: ['react', 'react-dom', "react-redux", "@reduxjs/toolkit"],
        publicPath: "http://localhost:3000/_next/",
      })
    );

    config.experiments = { topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
