import { lazy } from "react"
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const QnaList = lazy(() => import("@/page/community/qna")) // 목록
const QnaEdit = lazy(() => import("@/page/community/qna/component/edit")) // 작성/수정
const QnaDetail = lazy(() => import("@/page/community/qna/component/detail")) // 상세
const Faq = lazy(() => import("@/page/community/faq"))

const community = [
  {
    path: "/community",
    Component: Community,
    children: [
      { path: "", Component: Notice },
      { path: "notice", Component: Notice },
      { path: "qna", Component: QnaList },
      { path: "qna/write", Component: QnaEdit },
      { path: "qna/:id", Component: QnaDetail }, // 상세에 바로 QnaDetail 연결
      { path: "qna/:id/edit", Component: QnaEdit },
      { path: "faq", Component: Faq },
    ],
  },
]

export default community
