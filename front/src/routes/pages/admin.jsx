import Content from "@/layout/content"
import Admin from "@/page/admin"
import Movie from "@/page/admin/movie"
import User from "@/page/admin/user"

const admin = [
  {
    path: "/admin",
    Component: Content,
    children: [
      {
        path: "",
        Component: Admin,
      },
      {
        path: "movie",
        Component: Movie,
      },
      {
        path: "user",
        Component: User,
      },
    ],
  },
]

export default admin
