import { Outlet, useLocation, useNavigate } from "react-router"
import Header from "@/layout/header"
import Footer from "@/layout/footer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCommonCode, selectUser } from "@/store/selectors"
import { commonGetUserInfo } from "@/api/common"
import { setUserInfo } from "@/store/slices/user"
import { setCommonCode } from "@/store/slices/common"

const publicPaths = ["/login", "/signup", "/findId", "/findPw", "/404"]

export default function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const code = useSelector(selectCommonCode)
  const isPublic = publicPaths.includes(location.pathname)
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1]
  const commonCode = window.localStorage.getItem("commonCode")
    ? JSON.parse(window.localStorage.getItem("commonCode"))
    : null

  useEffect(() => {
    if (!code) dispatch(setCommonCode(commonCode))
    if (!isPublic) {
      if (!token) {
        navigate("/login", { replace: true })
        return
      }
      if (token && !user.info) {
        commonGetUserInfo().then((res) => {
          if (res.code === 200) dispatch(setUserInfo(res.data))
          else navigate("/login", { replace: true })
        })
      }
    } else {
      // public 페이지에서 토큰이 있으면 무조건 /main으로 이동
      if (token) {
        navigate("/main", { replace: true })
      }
      if (token && location.pathname === "/") {
        navigate("/main", { replace: true })
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <>
      {!isPublic && <Header />}
      <Outlet />
      {!isPublic && <Footer />}
    </>
  )
}
