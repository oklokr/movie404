import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9090,
  },
  resolve: {
    alias: {
      "@": "/src", // '@'를 '/src'로 매핑
    },
  },
})
