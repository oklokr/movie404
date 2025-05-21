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
    path: "/mypage",
    Component: Mypage,
    children: [
      {
        path: "/mypage/info",
        Component: Info,
      },

      {
        path: "/mypage/info/user",
        Component: Info,
      },
      {
        path: "/mypage/set",
        Component: Set,
      },
      {
        path: "/mypage/set/user",
        Component: Set,
      },
      {
        path: "/mypage/dvd",
        Component: Dvd,
      },
      {
        path: "/mypage/dvd/total",
        Component: Dvd,
      },
      {
        path: "/mypage/order/",
        Component: Order,
      },
      {
        path: "/mypage/order/orderlist",
        Component: Order,
      },
      {
        path: "/mypage/order/payment",
        Component: Order,
      },
      {
        path: "/mypage/terms/",
        Component: Terms,
      },
      {
        path: "/mypage/terms/termA",
        Component: Terms,
      },
      {
        path: "/mypage/terms/termB",
        Component: Terms,
      },
      {
        path: "/mypage/terms/termC",
        Component: Terms,
      },
    ],
  },
]

export default mypage
