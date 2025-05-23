import { Outlet, NavLink, useLocation, useNavigate } from "react-router"
import { useEffect } from "react"
import { css } from "@emotion/react"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { useModal } from "@/component/modalProvider"

const tabList = [
  { to: "/admin/user", label: "회원관리" },
  { to: "/admin/movie", label: "영화관리" },
  { to: "/admin/play", label: "상영관리" },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const { showAlert } = useModal()

  useEffect(() => {
    // user.info가 undefined 또는 null이면 아무 처리도 하지 않음
    if (user.info === undefined || user.info === null) return
    // userId 없거나, userTpcd가 "2"(문자열) 또는 2(숫자)가 아니면 차단
    if (!user.info?.userId || String(user.info?.userTpcd) !== "2") {
      showAlert({ message: "관리자 권한이 없습니다.", type: "error" })
      navigate("/", { replace: true })
    }
  }, [navigate, user.info, showAlert])

  return (
    <div css={wrapStyle}>
      <h2 css={titleStyle}>관리자</h2>
      <div css={tabRowStyle}>
        <div css={tabWrapStyle}>
          {tabList.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              css={tabStyle}
              className={location.pathname.startsWith(tab.to) ? "active" : ""}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div css={container}>
        <Outlet />
      </div>
    </div>
  )
}

const wrapStyle = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 32px 0 0 0;
  box-sizing: border-box;
  background: #fff;
`
const titleStyle = css`
  margin-bottom: 0;
  font-size: 28px;
  font-weight: 700;
  color: #222;
`
const tabRowStyle = css`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-start;
`
const tabWrapStyle = css`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  margin-top: 18px;
`
const tabStyle = css`
  padding: 10px 32px;
  border: 1px solid #ccc;
  border-bottom: none;
  background: #f9f9f9;
  color: #222;
  font-weight: 600;
  border-radius: 8px 8px 0 0;
  text-decoration: none;
  &.active {
    background: #fff;
    border-bottom: 2px solid #fff;
    color: #ff9800;
  }
`
const container = css`
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
  margin-top: 0;
  border: 1.5px solid #e0e0e0;
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
`
