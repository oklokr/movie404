import { lazy } from "react"
const AdminLayout = lazy(() => import("@/page/admin"))
const Movie = lazy(() => import("@/page/admin/movie"))
const User = lazy(() => import("@/page/admin/user"))
const Play = lazy(() => import("@/page/admin/play"))
const UserDetail = lazy(() => import("@/page/admin/user/component/detail")) // 상세 컴포넌트 import

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
        path: "play",
        Component: Play,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "user/:id", // 상세 경로 추가 (id는 회원 ID)
        Component: UserDetail,
      },
    ],
  },
]

export default admin
