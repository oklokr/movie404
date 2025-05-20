import { lazy } from "react"
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const NoticeDetail = lazy(() => import("@/page/community/notice/component/detail")) // 추가
const QnaList = lazy(() => import("@/page/community/qna"))
const QnaEdit = lazy(() => import("@/page/community/qna/component/edit"))
const QnaDetail = lazy(() => import("@/page/community/qna/component/detail"))
const Faq = lazy(() => import("@/page/community/faq"))
const NoticeEdit = lazy(() => import("@/page/community/notice/component/edit"))

const community = [
  {
    path: "/community",
    Component: Community,
    children: [
      { path: "", Component: Notice },
      { path: "notice", Component: Notice },
      { path: "notice/write", Component: NoticeEdit }, // 작성
      { path: "notice/:id", Component: NoticeDetail }, // 상세
      { path: "notice/:id/edit", Component: NoticeEdit }, // 수정
      { path: "qna", Component: QnaList },
      { path: "qna/write", Component: QnaEdit },
      { path: "qna/:id", Component: QnaDetail },
      { path: "qna/:id/edit", Component: QnaEdit },
      { path: "faq", Component: Faq },
    ],
  },
]

export default community
