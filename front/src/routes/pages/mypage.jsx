import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const Mypage = lazy(() => import("@/page/mypage"))
const Set = lazy(() => import("@/page/mypage/usersetting"))
const Info = lazy(() => import("@/page/mypage/userinfo"))
const Dvd = lazy(() => import("@/page/mypage/dvd"))
const Order = lazy(() => import("@/page/mypage/orderlist"))
const Terms = lazy(() => import("@/page/mypage/terms"))

const mypage = [
  {
    path: "mypage",
    Component: Mypage,
    children: [
      {
        path: "info",
        Component: Info,
      },

      {
        path: "info/user",
        Component: Info,
      },
      {
        path: "set",
        Component: Set,
      },
      {
        path: "set/user",
        Component: Set,
      },
      {
        path: "dvd",
        Component: Dvd,
      },
      {
        path: "dvd/total",
        Component: Dvd,
      },
      {
        path: "order/",
        Component: Order,
      },
      {
        path: "order/orderlist",
        Component: Order,
      },
      {
        path: "order/payment",
        Component: Order,
      },
      {
        path: "terms/",
        Component: Terms,
      },
      {
        path: "terms/termA",
        Component: Terms,
      },
      {
        path: "terms/termB",
        Component: Terms,
      },
      {
        path: "terms/termC",
        Component: Terms,
      },
    ],
  },
]

export default mypage
