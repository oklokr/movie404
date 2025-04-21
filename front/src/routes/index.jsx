import { createBrowserRouter, RouterProvider } from "react-router"
import Header from "@/layout/header"
import Footer from "@/layout/footer"

const modules = import.meta.glob("./pages/*.jsx", { eager: true })
const routers = Object.values(modules).flatMap((module) => module.default)
const router = createBrowserRouter(routers)

export default function Router() {
  return (
    <>
      <Header />
      <div className="main">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  )
}
