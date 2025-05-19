// components/Header.jsx
import { useCommon } from "@/store/commonContext"
import { css } from "@emotion/react"
import { Button, IconButton } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation } from "swiper/modules"

import logoImg from "@/assets/images/logo/logo2.png"
import icoUser from "@/assets/images/icon/ico_user.png"
import icoSearch from "@/assets/images/icon/ico_search.png"

import SearchIcon from "@mui/icons-material/Search"

export default function Header() {
  const { code } = useCommon()
  const genreTpcd = code.GENRE_TPCD

  console.log(genreTpcd)

  return (
    <div className="header" css={headerStyle}>
      <h1 className="logo">
        <a href="/main">
          <span>Not404 Cinema</span>
        </a>
      </h1>
      <Swiper navigation={true} modules={[Navigation]} className="gnb">
        {genreTpcd.map((item) => (
          <SwiperSlide key={item.commonValue}>
            <Button>{item.commonName}</Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className="user-btns">
        <li>
          <Button className="search">검색</Button>
        </li>
        <li>
          <Button className="user">사용자</Button>
        </li>
      </ul>
    </div>
  )
}

const headerStyle = css`
  display: flex;
  .logo {
    flex: 1;
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

  .user-btns {
    display: flex;
    align-items: center;
    list-style: none;
    width: 104px;
    flex: 1;
    margin: 0;
    padding: 0;

    .search,
    .user {
      text-indent: -9999px;
      color: transparent;
      position: relative;
    }

    .search:before {
      content: "";
      width: 32px;
      height: 32px;
      background: url(${icoSearch});
      background-size: 100%;
    }
    .user:before {
      content: "";
      width: 32px;
      height: 32px;
      background: url(${icoUser});
      background-size: 100%;
    }
  }
  .gnb {
    height: 100%;
  }
`
