import { css } from "@emotion/react"
import { Outlet, useLocation } from "react-router"

export default function content() {
  const { pathname } = useLocation()
  return (
    <>
      <div className={`container ${pathname === "/main" ? "main-page" : ""}`} css={containerStyle}>
        <Outlet />
      </div>
    </>
  )
}

const containerStyle = css`
  padding-top: 58px;
`
