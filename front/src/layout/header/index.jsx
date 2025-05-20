// components/Header.jsx
import { useCommon } from "@/store/commonContext"
import { css } from "@emotion/react"
import { Button, IconButton } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from "swiper/modules"

import logoImg from "@/assets/images/logo/logo2.png"

import SearchIcon from "@mui/icons-material/Search"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import SearchForm from "./component/searchForm"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import MyMenu from "./component/myMenu"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { useModal } from "@/component/ModalProvider"

export default function Header() {
  const { pathname } = useLocation()
  const { code } = useCommon()
  const [searchState, setSearchState] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [myMenuState, setMyMenuState] = useState(false)
  const [openMyMenu, setOpenMyMenu] = useState(false)
  const user = useSelector(selectUser)
  const { openModal, showAlert } = useModal()
  const navigate = useNavigate()
  const genreTpcd = code.GENRE_TPCD
  const gnbMenu = []
  for (let i = 0; i < genreTpcd.length; i += 10) {
    gnbMenu.push(genreTpcd.slice(i, i + 10))
  }

  const handleOepnSearch = () => {
    setSearchState(!searchState)
    if (!openSearch) {
      setOpenSearch(true)
    } else {
      setTimeout(() => {
        setOpenSearch(false)
      }, 200)
    }
  }

  const handleOpenMyMenu = () => {
    if (!user.info) {
      showAlert({ message: "로그인이 필요한 서비스입니다.", type: "error" })
      return navigate("/login")
    }
    setTimeout(
      () => {
        setMyMenuState(!myMenuState)
      },
      !myMenuState ? 200 : 0,
    )
    setTimeout(
      () => {
        setOpenMyMenu(!openMyMenu)
      },
      !openMyMenu ? 0 : 200,
    )
  }

  return (
    <header className={pathname === "/main" ? "main-page" : ""} css={headerWrap}>
      <div className="header" css={headerStyle}>
        <h1 className="logo">
          <a href="/main">
            <span>Not404 Cinema</span>
          </a>
        </h1>
        <Swiper navigation={true} modules={[Navigation]} spaceBetween={40} className="gnb">
          {gnbMenu.map((wrap, idx) => (
            <SwiperSlide key={idx}>
              {wrap.map((item) => (
                <Button key={item.commonValue}>{item.commonName}</Button>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>

        {openSearch && <SearchForm state={searchState} fn_handleOepnSearch={handleOepnSearch} />}

        <ul className="user-btns">
          <li>
            <IconButton aria-label="search" className="search" onClick={() => handleOepnSearch()}>
              <SearchIcon />
            </IconButton>
          </li>
          <li>
            <IconButton aria-label="user" className="user" onClick={() => handleOpenMyMenu()}>
              <PermIdentityIcon />
            </IconButton>
            {openMyMenu && <MyMenu state={myMenuState} fn_handleOpenMyMenu={handleOpenMyMenu} />}
          </li>
        </ul>
      </div>
    </header>
  )
}
const headerWrap = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`
const headerStyle = css`
  display: flex;
  align-items: center;
  .logo {
    margin: 0;
    a {
      display: block;
      width: 88px;
      height: 58px;
      position: relative;
      background: url(${logoImg});
      background-size: 100%;
      span {
        width: 1px;
        height: 1px;
        position: absolute;
        text-indent: -9999px;
        color: transparent;
      }
    }
  }

  .gnb {
    max-width: 760px;
    padding: 0 40px;
    margin: 0 auto;
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 20px;

      &.swiper-button-disabled {
        display: none;
      }
    }
    .swiper-slide {
      display: flex;
      justify-content: space-between;
    }

    .MuiButton-text {
      color: #212529;

      .main-page & {
        color: #fff;
      }

      .main-page:hover & {
        &:hover {
          color: #007aff;
        }
        color: #212529;
      }

      &:hover {
        color: #007aff;
      }
    }
  }

  .user-btns {
    display: flex;
    align-items: center;
    width: 88px;
    list-style: none;
    gap: 24px;
    margin: 0;
    padding: 0;

    .search,
    .user {
      padding: 0;

      svg {
        width: 32px;
        height: 32px;

        .main-page & {
          color: #fff;
        }

        .main-page:hover & {
          color: #212529;
        }
      }
    }
  }
`
