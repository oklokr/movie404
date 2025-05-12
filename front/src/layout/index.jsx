import { Outlet, useLocation, useNavigate } from "react-router"
import { Suspense, useEffect } from "react"
import Header from "@/layout/header"
import Footer from "@/layout/footer"

export default function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const defaultCheck = ["/login", "/404", "/signup", "/findId", "/findPw"]
  const isDefault = defaultCheck.includes(location.pathname)

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("authToken="))
    if (!token && !isDefault) navigate("/login")
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
