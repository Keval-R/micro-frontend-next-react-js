// const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

// module.exports = {
//   webpack(config: { plugins: any[]; }, options: any) {
//     config.plugins.push(
//       new NextFederationPlugin({
//         name: "nextApp",
//         filename: "static/chunks/remoteEntry.js",
//         remotes: {
//           host: "host@http://localhost:3000/_next/static/chunks/remoteEntry.js",
//         },
//         exposes: {
//           "./HomePage": "./src/pages/HomePage",
//         },

//         shared: ['react', 'react-dom', "react-redux", "@reduxjs/toolkit"],
//         publicPath: "http://localhost:3001/_next/",

//       })
//     );
//     return config;
//   }
// };
import { NextConfig } from "next";
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        search: '',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nextApp",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          host: "host@http://localhost:3000/_next/static/chunks/remoteEntry.js",
        },
        exposes: {
          "./Home": "./src/pages/index",
          "./productApi": "./src/pages/api/productApi",
        },
        shared: ['react', 'react-dom', "react-redux", "@reduxjs/toolkit"],
        publicPath: "http://localhost:3001/_next/",
      })
    );
    config.experiments = { topLevelAwait: true };
    return config;
  },
};

export default nextConfig;