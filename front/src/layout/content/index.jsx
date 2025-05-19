import { css } from "@emotion/react"
import { Outlet } from "react-router"

export default function content() {
  return (
    <>
      <div className="container" css={containerStyle}>
        <Outlet />
      </div>
    </>
  )
}

const containerStyle = css`
  padding-top: 58px;
`
