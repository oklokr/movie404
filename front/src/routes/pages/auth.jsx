import { lazy } from "react"
const Content = lazy(() => import("@/layout/content"))
const FindId = lazy(() => import("@/page/auth/findId"))
const FindPw = lazy(() => import("@/page/auth/findPw"))
const Signup = lazy(() => import("@/page/auth/signup"))
const Login = lazy(() => import("@/page/auth/login"))
const Result = lazy(() => import("@/page/auth/signup/result"))
const Terms = lazy(() => import("@/page/auth/terms"))

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
  {
    path: "/signup",
    Component: Content,
    children: [
      {
        path: "",
        Component: Signup,
      },
    ],
  },
  {
    path: "/result",
    Component: Content,
    children: [
      {
        path: "",
        Component: Result,
      },
    ],
  },
  {
    path: "/terms",
    Component: Content,
    children: [
      {
        path: "",
        Component: Terms,
      },
    ],
  },
]

export default auth
