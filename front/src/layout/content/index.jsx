import { css } from "@emotion/react"
import { Outlet } from "react-router"

const contentStyle = css`
  height: 100vh;
`

export default function content() {
  return (
    <>
      <div css={contentStyle}>
        <Outlet />
      </div>
    </>
  )
}
