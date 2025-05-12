import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "@/locales/i18n"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/assets/css/common.scss"
import { RouterProvider } from "react-router"
import { router } from "@/routes"
import { Provider } from "react-redux"
import store from "./store"

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>,
  // <StrictMode>
  // </StrictMode>,
)
