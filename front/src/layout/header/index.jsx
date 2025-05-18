import { css } from "@emotion/react"

export default function header() {
  return (
    <div className="header" css={headerStyle}>
      <h1>로고</h1>
      <ul className="nav"></ul>
      <ul className="user-btns"></ul>
    </div>
  )
}

const headerStyle = css`
  display: flex;
`
