import { lazy } from "react"
const Community = lazy(() => import("@/page/community"))
const Notice = lazy(() => import("@/page/community/notice"))
const NoticeDetail = lazy(() => import("@/page/community/notice/component/detail"))
const QnaList = lazy(() => import("@/page/community/qna"))
const QnaEdit = lazy(() => import("@/page/community/qna/component/edit"))
const QnaDetail = lazy(() => import("@/page/community/qna/component/detail"))
const Faq = lazy(() => import("@/page/community/faq"))
const FaqEdit = lazy(() => import("@/page/community/faq/component/edit")) // 추가
const NoticeEdit = lazy(() => import("@/page/community/notice/component/edit"))

const community = [
  {
    path: "/community",
    Component: Community,
    children: [
      { path: "", Component: Notice },
      { path: "notice", Component: Notice },
      { path: "notice/write", Component: NoticeEdit },
      { path: "notice/:id", Component: NoticeDetail },
      { path: "notice/:id/edit", Component: NoticeEdit },
      { path: "qna", Component: QnaList },
      { path: "qna/write", Component: QnaEdit },
      { path: "qna/:id", Component: QnaDetail },
      { path: "qna/:id/edit", Component: QnaEdit },
      { path: "faq", Component: Faq },
      { path: "faq/write", Component: FaqEdit }, // 작성
      { path: "faq/:faqCode/edit", Component: FaqEdit }, // 수정
    ],
  },
]

export default community
