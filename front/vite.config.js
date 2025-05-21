import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    port: 9090,
  },
  preview: {
    port: 9090,
  },
  resolve: {
    alias: {
      "@": "/src", // '@'를 '/src'로 매핑
    },
  },
})
