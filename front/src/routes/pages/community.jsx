import Content from "@/layout/content"
import Community from "@/page/community"
import Notice from "@/page/community/notice"
import Qna from "@/page/community/qna"

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
