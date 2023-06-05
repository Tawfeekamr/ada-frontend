import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/

export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_REST_URL),
    },
    plugins: [react(), svgr()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: `${env.VITE_APP_REST_URL}`,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {});
            proxy.on("proxyReq", (proxyReq, req, _res) => {});
            proxy.on("proxyRes", (proxyRes, req, _res) => {});
          },
        },
      },
    },
    // @ts-ignore
    test: {
      globals: true,
      environment: "jsdom",
    },
  });
};
