import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/TipOff",
  plugins: [react()],
  resolve: { extensions: [".js", ".ts", ".tsx", ".jsx"] },
});
