import { lazy } from "react"
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const NoticeDetail = lazy(() => import("@/page/community/notice/component/detail")) // 추가
const QnaList = lazy(() => import("@/page/community/qna"))
const QnaEdit = lazy(() => import("@/page/community/qna/component/edit"))
const QnaDetail = lazy(() => import("@/page/community/qna/component/detail"))
const Faq = lazy(() => import("@/page/community/faq"))

const community = [
  {
    path: "/community",
    Component: Community,
    children: [
      { path: "", Component: Notice },
      { path: "notice", Component: Notice },
      { path: "notice/:id", Component: NoticeDetail }, // 상세 라우트 추가
      { path: "qna", Component: QnaList },
      { path: "qna/write", Component: QnaEdit },
      { path: "qna/:id", Component: QnaDetail },
      { path: "qna/:id/edit", Component: QnaEdit },
      { path: "faq", Component: Faq },
    ],
  },
]

export default community
