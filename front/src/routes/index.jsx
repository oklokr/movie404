import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useLocation,
} from "react-router"
import Page404 from "@/page/404"
import Header from "@/layout/header"
import Footer from "@/layout/footer"
import admin from "@/routes/pages/admin"
import auth from "@/routes/pages/auth"
import community from "@/routes/pages/community"
import main from "@/routes/pages/main"
import { useEffect, useState } from "react"

// const modules = import.meta.glob("./pages/*.jsx")
// const pageRoutes = Object.values(modules).flatMap((m) => m.default)

function requiresAuth(res) {
  let state = true
  // if (state) {
  //   console.log("토큰 없는 경우 리다이렉트")
  //   return redirect("/login")
  // } else {
  //   return redirect("/main")
  // }
}

const routes = [
  // ...pageRoutes,
  {
    path: "/404",
    Component: Page404,
  },
  {
    path: "*",
    Component: Page404,
    // loader: requiresAuth,
  },
]

// const router = createBrowserRouter(routes)
export default function Router() {
  // const [isHerf, setHerf] = useState("")
  // setHerf(window.location.pathname)
  // console.log(isHerf)
  return (
    <>
      <div>test</div>
      {/* <Header /> */}
      {/* <RouterProvider router={router} /> */}
      {/* <Footer /> */}
    </>
  )
}
