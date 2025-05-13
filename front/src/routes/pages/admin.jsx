import { lazy } from "react"
const AdminLayout = lazy(() => import("@/page/admin"))
const Movie = lazy(() => import("@/page/admin/movie"))
const MovieEdit = lazy(() => import("@/page/admin/movie/component/edit"))
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
        path: "movie/edit", // 등록/수정 페이지 경로 추가
        Component: MovieEdit,
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
