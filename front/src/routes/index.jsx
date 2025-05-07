import { createBrowserRouter } from "react-router"
import Page404 from "@/page/404"
import Layout from "@/layout"
const modules = import.meta.glob("./pages/*.jsx", { eager: true })
const pageRoutes = Object.values(modules).flatMap((m) => m.default)

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      ...pageRoutes,
      {
        path: "404",
        Component: Page404,
      },
      {
        path: "*",
        Component: Page404,
        // loader: requiresAuth,
      },
    ],
  },
]

const router = createBrowserRouter(routes)
export { router }
