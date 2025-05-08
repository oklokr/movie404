import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/locales/i18n"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/assets/css/common.scss"
import { RouterProvider } from "react-router"
import { router } from "@/routes"

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
  // <StrictMode>
  // </StrictMode>,
)
