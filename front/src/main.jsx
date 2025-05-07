import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/locales/i18n"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Router from "@/routes"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
