import { Outlet, useLocation } from "react-router"
import { useEffect } from "react"
import Header from "@/layout/header"
import Footer from "@/layout/footer"

export default function RootLayout() {
  const location = useLocation()

  const defaultCheck = ["/login", "/404", "/signup", "/findId", "/findPw"]
  const isDefault = defaultCheck.includes(location.pathname)

  useEffect(() => {
    console.log("라우터 변경:", location.pathname)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      {!isDefault && <Header />}
      <Outlet />
      {!isDefault && <Footer />}
    </>
  )
}
