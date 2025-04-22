import { createBrowserRouter, RouterProvider } from "react-router"
import Page404 from "@/page/404"

const modules = import.meta.glob("./pages/*.jsx", { eager: true })
const routers = Object.values(modules).flatMap((module) => module.default)
const router = createBrowserRouter([
  {
    path: "/404",
    Component: Page404,
  },
  {
    path: "*",
    Component: Page404,
  },
  ...routers,
])

export default router
