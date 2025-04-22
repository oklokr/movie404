import Content from "@/layout/content"
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
]

export default auth
