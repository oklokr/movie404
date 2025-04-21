import Content from "@/layout/content"
import Login from "@/page/auth/login"

const auth = [
  {
    path: "/",
    element: <Content />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]

export default auth
