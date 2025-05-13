import { lazy } from "react"
const AdminLayout = lazy(() => import("@/page/admin"))
const Movie = lazy(() => import("@/page/admin/movie"))
const MovieEdit = lazy(() => import("@/page/admin/movie/component/edit"))
const MovieDetail = lazy(() => import("@/page/admin/movie/component/detail")) // 추가
const User = lazy(() => import("@/page/admin/user"))
const Play = lazy(() => import("@/page/admin/play"))
const UserDetail = lazy(() => import("@/page/admin/user/component/detail"))

const admin = [
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "movie",
        Component: Movie,
      },
      {
        path: "movie/edit",
        Component: MovieEdit,
      },
      {
        path: "movie/edit/:movieCode", // 수정 경로 추가
        Component: MovieEdit,
      },
      {
        path: "movie/:movieCode", // 상세 경로 추가
        Component: MovieDetail,
      },
      {
        path: "play",
        Component: Play,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "user/:id",
        Component: UserDetail,
      },
    ],
  },
]

export default admin
