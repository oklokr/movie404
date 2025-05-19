import { mainGetMovieList } from "@/api/main"
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

function main() {
  const [fetchData, setFetchData] = useState({
    showMovies: [],
    allMovie: [],
    randomMovie: [],
  })

  useEffect(() => {
    const fetchMovie = async () => {
      const showMovie = await mainGetMovieList({ schedule: "1" })
      const allMovie = await mainGetMovieList({ size: 28 })

      // 랜덤 5개 추출
      const randomIndexes = []
      while (randomIndexes.length < 5) {
        const randomIndex = Math.floor(Math.random() * allMovie.data.list.length)
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex)
        }
      }

      // 랜덤으로 추출한 값 저장
      const randomMovie = randomIndexes.map((index) => allMovie.data.list[index])

      // 랜덤으로 추출한 값을 제외한 나머지 값 저장
      const filteredAllMovie = allMovie.data.list.filter(
        (_, index) => !randomIndexes.includes(index),
      )

      // 상태 업데이트
      setFetchData({
        showMovies: showMovie.data.list,
        allMovie: filteredAllMovie,
        randomMovie: randomMovie,
      })
    }

    fetchMovie()
  }, [])

  console.log(fetchData)

  return (
    <div css={mainStyle}>
      <section>
        <h3></h3>
        <Swiper navigation={true} modules={[Navigation]} className="banner">
          {fetchData.randomMovie.map((item) => (
            <SwiperSlide key={item.movieCode}>test</SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <Swiper navigation={true} modules={[Navigation]} className="banner">
          {fetchData.randomMovie.map((item) => (
            <SwiperSlide key={item.movieCode}>test</SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <Swiper navigation={true} modules={[Navigation]} className="banner">
          {fetchData.randomMovie.map((item) => (
            <SwiperSlide key={item.movieCode}>test</SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

const mainStyle = css`
  padding-top: 60px;
  position: relative;
`

export default main
