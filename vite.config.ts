import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
      react: resolve(import.meta.dirname, "./node_modules/react"),
      "react-dom": resolve(import.meta.dirname, "./node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
})
