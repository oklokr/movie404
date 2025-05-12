import { lazy } from "react"
const AdminLayout = lazy(() => import("@/page/admin")) // index.jsx가 기본 export
const Movie = lazy(() => import("@/page/admin/movie"))
const User = lazy(() => import("@/page/admin/user"))
const Play = lazy(() => import("@/page/admin/play"))

const admin = [
  {
    path: "/admin",
    Component: AdminLayout, // Content → AdminLayout으로 변경
    children: [
      {
        path: "movie",
        Component: Movie,
      },
      {
        path: "play",
        Component: Play,
      },
      {
        path: "user",
        Component: User,
      },
    ],
  },
]

export default admin
