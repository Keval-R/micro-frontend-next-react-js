import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

const isServer = typeof window === "undefined";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "basket",
      exposes: {
        "./Cart": "./src/component/Cart",
      },
      remotes: {
        host: `host@http://localhost:3000/_next/static/${
          isServer ? "ssr" : "chunks"
        }/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
        "react-redux": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: {
    port: 3002,
  },
});
