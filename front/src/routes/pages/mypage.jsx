import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const Mypage = lazy(() => import("@/page/mypage"))

const mypage = [
  {
    path: "/mypage",
    Component: Content,
    children: [
      {
        path: "",
        Component: Mypage,
      },
    ],
  },
]

export default mypage
