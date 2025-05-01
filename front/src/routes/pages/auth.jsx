import Content from "@/layout/content"
import FindId from "@/page/auth/findId"
import FindPw from "@/page/auth/findPw"
import Login from "@/page/auth/login"

const auth = [
  {
    path: "/login",
    Component: Content,
    children: [
      {
        path: "",
        Component: Login,
      },
    ],
  },
  {
    path: "/findId",
    Component: Content,
    children: [
      {
        path: "",
        Component: FindId,
      },
    ],
  },
  {
    path: "/findPw",
    Component: Content,
    children: [
      {
        path: "",
        Component: FindPw,
      },
    ],
  },
]

export default auth
