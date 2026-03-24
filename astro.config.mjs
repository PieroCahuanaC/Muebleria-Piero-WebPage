// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind"; // ✅ correcto
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default defineConfig({
  vite: {
    envPrefix: "PUBLIC_",
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  output: "server",
  integrations: [
    react(),
    tailwind() // ✅ aquí va Tailwind
  ],
  adapter: vercel(),
});