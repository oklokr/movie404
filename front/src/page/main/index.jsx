/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"
import { useEffect, useRef, useState } from "react"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { mainGetMovieList } from "@/api/main"
import { Button } from "@mui/material"
import { usePopup } from "@/component/popupProvider"
import { useCommon } from "@/store/commonContext"
import PopMovieDetail from "@/component/popup/popMovieDetail"

function MainPage() {
  const [fetchData, setFetchData] = useState({
    showMovies: [],
    allMovie: [],
    latest: [],
    randomPoster: null,
  })
  const [openFAQ, setOpenFAQ] = useState(null)
  const [bgY, setBgY] = useState(0)
  const rafRef = useRef()
  const { openPopup } = usePopup()
  const { code } = useCommon()

  // 패럴럭스 js
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setBgY(window.scrollY * 0.2)
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // fetchData
  useEffect(() => {
    const fetchMovie = async () => {
      const showMovie = await mainGetMovieList({ schedule: "1" })
      const allMovie = await mainGetMovieList({ size: 28 })

      // 최신순 5개만 추출 (리스트 앞에서 5개)
      const latestMovie = allMovie.data.list.slice(0, 5)
      const filteredAllMovie = allMovie.data.list.slice(5)

      setFetchData({
        showMovies: showMovie.data.list,
        allMovie: filteredAllMovie,
        latest: latestMovie,
        randomPoster: latestMovie[Math.floor(Math.random() * latestMovie.length)].poster,
      })
    }

    fetchMovie()
  }, [])

  const openForm = (list, movieCode) => {
    const targetItem = list.find((item) => item.movieCode === movieCode)
    const findGenre = (keys) => {
      if (!code?.GENRE_TPCD || !targetItem) return []
      return keys.reduce((acc, key) => {
        const genreCode = targetItem[key]
        if (!genreCode) return acc
        const genreObj = code.GENRE_TPCD.find((item) => item.commonValue === genreCode)
        if (genreObj && genreObj.commonName) acc.push(genreObj.commonName)
        return acc
      }, [])
    }
    const genreList = findGenre(["genreCodeA", "genreCodeB", "genreCodeC"])
    console.log(targetItem)
    openPopup({
      content: () => <PopMovieDetail targetItem={targetItem} genreList={genreList} />,
    })
  }

  const faqList = [
    { q: "프로젝트 큰일났을 때 어떻게 해야함", a: "빨리 빨리 해야져" },
    { q: "선장은 undefined입니다", a: "타입을 지정해야 합니다." },
    { q: "const undefined=승주행님;", a: "???" },
  ]

  const mainStyle = css`
    padding: 98px 40px 0;
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    &:before {
      content: "";
      background: url(${fetchData.randomPoster}) no-repeat;
      background-size: cover;
      background-position: center ${-bgY}px;
      filter: blur(2px) brightness(0.7);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -2;
    }
    &:after {
      content: "";
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(180deg, #000000b5 60%, #000 100%);
      z-index: -1;
      pointer-events: none;
    }
    section {
      & + section {
        margin-top: 140px;
      }
      > h3 {
        color: #fff;
        font-size: 36px;

        + *:not(.swiper) {
          margin-top: 40px;
        }
      }
    }

    .banner {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin: 0 -40px;
      position: relative;
      background: linear-gradient(135deg, #444, #000);

      .swiper {
        height: 520px;

        .image-wrap {
          display: flex;
          align-items: center;

          img {
            width: 100%;
          }
        }
      }

      h3 {
        width: 1px;
        height: 1px;
        text-indent: -9999px;
        color: transparent;
      }
    }
  `

  const rankingGrid = css`
    list-style: none;
    padding: 0;
    margin: 20px 0 0;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 4fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    height: 500px;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 240px;
      font-weight: bold;
      font-size: 20px;
      position: relative;
      border-radius: 12px;
      background-color: #ddd;
      cursor: pointer;

      &:before {
        content: "";
      }

      &:hover {
        .image-wrap img {
          transform: scale(1.2);
        }
      }

      &-1 {
        grid-column: 1 / 4;
        grid-row: 1 / 2;
      }

      &-2 {
        grid-column: 4 / 5;
        grid-row: 1 / 3;
        height: 500px;
      }

      &-3 {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }

      &-4 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }

      &-5 {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
      }

      strong {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate3d(-50%, -50%, 0px);
        color: #fff;
        font-size: 30px;
        z-index: 1;
      }
      .image-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          transform: scale(1);
          transition: 0.3s;
        }
      }
    }
  `

  const rankingItem = css`
    font-size: 24px;
    text-align: center;
    background: #ddd;
  `

  const gridBox = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    .image-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
  `

  const gridItem = css`
    height: 180px;
    background: #333;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }

    &::after {
      content: "더보기 →";
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      text-align: center;
      padding: 10px;
      transition: bottom 0.3s ease;
    }

    &:hover::after {
      bottom: 0;
    }
  `

  const faqBox = css`
    border-top: 1px solid #ccc;
  `

  const faqQuestion = css`
    padding: 15px;
    cursor: pointer;
    background: #f1f1f1;
    &:hover {
      background: #e0e0e0;
    }
  `

  const faqAnswer = css`
    padding: 15px;
    background: #fff;
    border-top: 1px solid #ccc;
  `

  return (
    <div css={mainStyle}>
      <section className="banner">
        <h3>최신순 영화</h3>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
        >
          {fetchData.latest.map((item) => (
            <SwiperSlide key={item.movieCode}>
              <span className="image-wrap">
                <img src={item.background} alt={item.movieName} />
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="show-movie">
        <h3>상영중인 영화</h3>
        <Swiper slidesPerView={5} spaceBetween={20} navigation modules={[Navigation]}>
          {fetchData.showMovies.map((item) => (
            <SwiperSlide key={item.movieCode}>
              <div className="movie-poster">
                <span>
                  <img src={item.poster} alt={item.movieName} />
                </span>
                <div className="info">
                  <p>{item.movieName}</p>
                  <Button
                    variant="contained"
                    onClick={() => openForm(fetchData.showMovies, item.movieCode)}
                  >
                    상세보기
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="lank-movie">
        <h3>인기순위</h3>
        <ul css={rankingGrid}>
          {fetchData.allMovie.slice(0, 5).map((item, idx) => (
            <li key={item.movieCode} className={`item item-${idx + 1}`} css={rankingItem}>
              <strong>{idx + 1}</strong>
              <span className="image-wrap">
                <img src={item.poster} alt={item.movieName} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="all-movie">
        <h3>이런 영화도 있어요!</h3>
        <div css={gridBox}>
          {fetchData.allMovie.slice(5, 21).map((item) => (
            <div key={item.movieCode} css={gridItem}>
              <span className="image-wrap">
                <img src={item.background} alt={item.movieName} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="qna">
        <h3>자주 묻는 질문</h3>
        <div css={faqBox}>
          {faqList.map((faq, idx) => (
            <div key={idx}>
              <div css={faqQuestion} onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}>
                Q. {faq.q}
              </div>
              {openFAQ === idx && <div css={faqAnswer}>A. {faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MainPage
