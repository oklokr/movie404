import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import router from "./routes"
import Header from "@/layout/header"
import Footer from "@/layout/footer"
// import "./index.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    <Footer />
  </>,
)
