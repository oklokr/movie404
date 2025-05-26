import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  base: "/not404/",
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": "/src", // '@'를 '/src'로 매핑
    },
  },
})
