import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "",
  plugins: [react()],
  server: {
    // this ensures that the browser opens upon server start
    open: false,
    // this sets a default port to 3000
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 100000,
  },
});
