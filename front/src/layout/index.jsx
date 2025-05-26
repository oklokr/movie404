import { Outlet, useLocation, useNavigate } from "react-router"
import Header from "@/layout/header"
import Footer from "@/layout/footer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCommonCode, selectUser } from "@/store/selectors"
import { commonGetUserInfo } from "@/api/common"
import { setUserInfo } from "@/store/slices/user"
import { setCommonCode } from "@/store/slices/common"
import { useCommon } from "@/store/commonContext"
import { SearchProvider } from "@/component/searchProvider"
import { ModalProvider } from "@/component/modalProvider"
import { PopupProvider } from "@/component/popupProvider"
import PopupContainer from "@/component/popupContainer"

const publicPaths = [
  "/not404/login",
  "/not404/signup",
  "/not404/findId",
  "/not404/findPw",
  "/not404/404",
]

export default function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { code } = useCommon()
  const user = useSelector(selectUser)
  const isPublic = publicPaths.includes(location.pathname)
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1]
  const commonCode = window.localStorage.getItem("commonCode")
    ? JSON.parse(window.localStorage.getItem("commonCode"))
    : null

  useEffect(() => {
    if (location.pathname === "/not404" || location.pathname === "/not404/") {
      console.log("메인 이동")

      navigate("/not404/main")
    }
    if (!code) dispatch(setCommonCode(commonCode))
    if (token && !user.info) {
      commonGetUserInfo().then((res) => {
        if (res.code === 200) dispatch(setUserInfo(res.data))
        else navigate("/not404/login", { replace: true })
      })
    }
    if (isPublic && token) navigate("/not404/main", { replace: true })

    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <ModalProvider>
      <PopupProvider>
        <SearchProvider>
          {!isPublic && <Header />}
          <Outlet />
          {!isPublic && <Footer />}
        </SearchProvider>
        <PopupContainer />
      </PopupProvider>
    </ModalProvider>
  )
}
