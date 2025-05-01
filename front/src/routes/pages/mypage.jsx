import Content from "@/layout/content"
import Mypage from "@/page/mypage"

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
