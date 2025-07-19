// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless"; // 👈 adaptador para Vercel

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    envPrefix: "PUBLIC_",
  },
  output: "server", // 👈 requerido para usar adaptador serverless
  integrations: [react()],
  adapter: vercel({}), // 👈 se agrega aquí el adaptador
});
