import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const Qna = lazy(() => import("@/page/community/qna"))

const community = [
  {
    path: "/community",
    Component: Content,
    children: [
      {
        path: "",
        Component: Community,
      },
      {
        path: "notice",
        Component: Notice,
      },
      {
        path: "qna",
        Component: Qna,
      },
    ],
  },
]

export default community
