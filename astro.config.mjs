// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import dotenv from "dotenv";
import react from "@astrojs/react";
// https://astro.build/config
dotenv.config();

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    envPrefix: "PUBLIC_",
  },

  integrations: [react()],
});
