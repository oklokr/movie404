import { selectUser } from "@/store/selectors"
import { resetUserInfo } from "@/store/slices/user"
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"

export default function MyMenu({ state, fn_handleOpenMyMenu }) {
  const [activeState, setActiveState] = useState(false)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => setActiveState(state))

  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/"
    dispatch(resetUserInfo())
    location.reload(true)
  }

  return (
    <div className={state ? "active" : ""} css={myMenuStyle}>
      <ul>
        <li>
          <Link to="/mypage" onClick={fn_handleOpenMyMenu}>
            MY
          </Link>
        </li>
        <li>
          <Link to="/mypage/dvd" onClick={fn_handleOpenMyMenu}>
            나의 DVD
          </Link>
        </li>
        <li>
          <Link to="/mypage/order" onClick={fn_handleOpenMyMenu}>
            결제내역
          </Link>
        </li>
        <li>
          <Link to="/community/qna" onClick={fn_handleOpenMyMenu}>
            고객센터
          </Link>
        </li>
        <li>
          <Link to="/mypage/set" onClick={fn_handleOpenMyMenu}>
            설정
          </Link>
        </li>
        {user?.info.userTpcd === "2" && (
          <li>
            <Link to="/admin" onClick={fn_handleOpenMyMenu}>
              관리자
            </Link>
          </li>
        )}
        <li>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  )
}

const myMenuStyle = css`
  position: absolute;
  top: 100%;
  right: 0;
  overflow: hidden;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 26px 32px;
    background: #ffffff24;
    border: 1px solid #00000024;
    transition: 0.2s;
    transform: translateY(-100%);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);

    main-page & {
      border: initial;
      background: #ffffff24;
    }
  }
  li {
    color: #212529;
    text-align: center;
    .main-page & {
      color: #fff;
    }
    &:nth-of-type(1) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.12s;
    }
    &:nth-of-type(2) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.16s;
    }
    &:nth-of-type(3) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.2s;
    }
    &:nth-of-type(4) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.24s;
    }
    &:nth-of-type(5) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.28s;
    }
    &:nth-of-type(6) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.32s;
    }
    &:nth-of-type(7) {
      transform: translateY(calc(-100% - 12px));
      transition: transform 0.2s 0.36s;
    }
  }

  button {
    font-size: initial;
    cursor: pointer;
    padding: 0;
    border: 0;
    background: initial;
  }

  a,
  button {
    color: #212529;
    .main-page & {
      color: #fff;
    }
    text-decoration: none;
    position: relative;
    &:after {
      content: "";
      width: 0;
      height: 1px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: #007aff;
      transition: 0.2s;
    }

    &:hover {
      color: #007aff;
      &:after {
        width: 100%;
      }
    }
  }

  &.active {
    ul {
      transform: translateY(0);
    }
    li {
      transform: translateY(0);
    }
  }
`
