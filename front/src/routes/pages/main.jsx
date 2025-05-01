import Content from "@/layout/content"
import Main from "@/page/main"
import Reservation from "@/page/main/reservation"

const main = [
  {
    path: "/main",
    Component: Content,
    children: [
      {
        path: "",
        Component: Main,
      },
      {
        path: "reservation",
        Component: Reservation,
      },
    ],
  },
]

export default main
