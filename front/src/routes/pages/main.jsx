import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const Main = lazy(() => import("@/page/main"))
const Reservation = lazy(() => import("@/page/main/reservation"))

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
