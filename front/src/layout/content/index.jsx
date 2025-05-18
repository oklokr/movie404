import { css } from "@emotion/react"
import { Outlet } from "react-router"

export default function content() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}
