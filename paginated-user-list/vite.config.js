import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  build: {
    outDir: "build", // This makes sure Vite outputs to the 'build' folder
  },

  base: "/machine-coding-tasks", // Add this line
  plugins: [tailwindcss()],
});
