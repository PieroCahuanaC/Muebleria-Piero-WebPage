// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite"; // tu forma anterior
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    envPrefix: "PUBLIC_",
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  output: "server",
  integrations: [react()],
  adapter: vercel({}),
});
