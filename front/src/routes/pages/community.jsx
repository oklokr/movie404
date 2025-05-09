import { lazy } from "react"
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const Qna = lazy(() => import("@/page/community/qna"))
const Faq = lazy(() => import("@/page/community/faq"))

const community = [
  {
    path: "/community",
    Component: Community,
    children: [
      { path: "", Component: Notice },
      { path: "notice", Component: Notice },
      { path: "qna", Component: Qna },
      { path: "qna/:id", Component: Qna }, // ← detail 도 Qna로 처리
      { path: "faq", Component: Faq },
    ],
  },
]

export default community
