import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const Admin = lazy(() => import("@/page/admin"))
const Movie = lazy(() => import("@/page/admin/movie"))
const User = lazy(() => import("@/page/admin/user"))

const admin = [
  {
    path: "/admin",
    Component: Content,
    children: [
      {
        path: "",
        Component: Admin,
      },
      {
        path: "movie",
        Component: Movie,
      },
      {
        path: "user",
        Component: User,
      },
    ],
  },
]

export default admin
