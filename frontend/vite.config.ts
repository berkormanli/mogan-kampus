import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      prerender: {
        enabled: true,
        routes: [
          "/",
          "/programlar/*",
          "/atolyeler/*",
          "/mekanlar/*",
        ],
        crawlLinks: true,
      },
    }),
    react(),
  ],
});
