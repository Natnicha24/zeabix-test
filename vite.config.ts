import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/carapi': {
        target: 'https://www.carqueryapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/carapi/, '')
      }
    }
  }
});


