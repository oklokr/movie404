import { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useNavigate, useParams } from "react-router"
import {
  createMovie,
  fetchMovieDetail,
  updateMovie,
  fetchGenreList,
  fetchCreatorList,
} from "@/api/admin"
import Button from "@mui/material/Button"
import { useModal } from "@/component/modalProvider"

export default function MovieEdit() {
  const navigate = useNavigate()
  const { movieCode } = useParams()
  const { openModal, closeModal, showAlert } = useModal()
  // 폼 상태
  const [poster, setPoster] = useState("")
  const [posterInput, setPosterInput] = useState("")
  const [background, setBackground] = useState("")
  const [backgroundInput, setBackgroundInput] = useState("")
  const [genreList, setGenreList] = useState([])
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [teaser, setTeaser] = useState("")
  const [directors, setDirectors] = useState([])
  const [directorInput, setDirectorInput] = useState("")
  const [casts, setCasts] = useState([])
  const [castInput, setCastInput] = useState("")
  const [dvdUse, setDvdUse] = useState(true)
  const [dvdPrice, setDvdPrice] = useState("")
  const [dvdDiscount, setDvdDiscount] = useState("")
  const [dvdDateFrom, setDvdDateFrom] = useState("")
  const [dvdDateTo, setDvdDateTo] = useState("")
  const [loading, setLoading] = useState(false)
  const [runtime, setRuntime] = useState("")
  const [creatorList, setCreatorList] = useState([])

  useEffect(() => {
    fetchGenreList().then((res) => {
      setGenreList(res.data ? res.data : res)
    })
    fetchCreatorList().then((res) => {
      setCreatorList(res.data ? res.data : res)
    })
  }, [])

  useEffect(() => {
    if (!movieCode) return
    fetchMovieDetail(movieCode).then((res) => {
      const movie = res.data ? res.data : res
      setPoster(movie.poster || "")
      setPosterInput(movie.poster || "")
      setBackground(movie.background || "")
      setBackgroundInput(movie.background || "")
      setGenre(movie.genreCodeA || "")
      setRating(movie.ratingTpcd || "")
      setTitle(movie.movieName || "")
      setDesc(movie.synopsis || "")
      setTeaser(movie.teaser || "")
      setDirectors([movie.directCodeA, movie.directCodeB].filter(Boolean))
      setCasts(
        [
          movie.actorCodeA,
          movie.actorCodeB,
          movie.actorCodeC,
          movie.actorCodeD,
          movie.actorCodeE,
        ].filter(Boolean),
      )
      if (movie.runtime) {
        if (typeof movie.runtime === "string" && movie.runtime.includes(":")) {
          const [h, m] = movie.runtime.split(":")
          setRuntime(String(parseInt(h) * 60 + parseInt(m)))
        } else {
          setRuntime(String(movie.runtime))
        }
      } else {
        setRuntime("")
      }
      const hasDvd =
        (movie.dvdPrice && movie.dvdPrice !== "") ||
        (movie.dvdDiscount && movie.dvdDiscount !== "" && movie.dvdDiscount !== "0") ||
        (movie.dvdDateFrom && movie.dvdDateFrom !== "") ||
        (movie.dvdDateTo && movie.dvdDateTo !== "")
      if (hasDvd) {
        setDvdUse(true)
        setDvdPrice(movie.dvdPrice || "")
        setDvdDiscount(
          movie.dvdDiscount !== undefined && movie.dvdDiscount !== null && movie.dvdDiscount !== ""
            ? movie.dvdDiscount
            : "0",
        )
        setDvdDateFrom(movie.dvdDateFrom || "")
        setDvdDateTo(movie.dvdDateTo || "")
      } else {
        setDvdUse(false)
        setDvdPrice("")
        setDvdDiscount("0")
        setDvdDateFrom("")
        setDvdDateTo("")
      }
    })
  }, [movieCode])

  const handlePosterInputChange = (e) => {
    setPosterInput(e.target.value)
    setPoster(e.target.value)
  }
  const handlePosterRemove = () => {
    setPoster("")
    setPosterInput("")
  }

  const handleBackgroundInputChange = (e) => {
    setBackgroundInput(e.target.value)
    setBackground(e.target.value)
  }
  const handleBackgroundRemove = () => {
    setBackground("")
    setBackgroundInput("")
  }

  const filteredDirectorOptions = creatorList.filter(
    (c) => c.name.includes(directorInput) && !directors.includes(c.code),
  )
  const filteredCastOptions = creatorList.filter(
    (c) => c.name.includes(castInput) && !casts.includes(c.code),
  )

  const addDirector = (code) => {
    if (!code) return
    if (directors.length >= 2) {
      showAlert({ message: "감독은 최대 2명까지 등록할 수 있습니다.", type: "warning" })
      return
    }
    if (!directors.includes(code)) {
      setDirectors([...directors, code])
      setDirectorInput("")
    }
  }
  const removeDirector = (code) => {
    setDirectors(directors.filter((d) => d !== code))
  }

  const addCast = (code) => {
    if (!code) return
    if (casts.length >= 5) {
      showAlert({ message: "출연진은 최대 5명까지 등록할 수 있습니다.", type: "warning" })
      return
    }
    if (!casts.includes(code)) {
      setCasts([...casts, code])
      setCastInput("")
    }
  }
  const removeCast = (code) => {
    setCasts(casts.filter((c) => c !== code))
  }

  const getCreatorName = (code) => {
    const c = creatorList.find((c) => c.code === code)
    return c ? c.name : code
  }

  const handleGenreSelect = (code) => {
    setGenre(code)
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleListClick = () => {
    const hasValue =
      posterInput ||
      backgroundInput ||
      genre ||
      rating ||
      title ||
      desc ||
      teaser ||
      directors.length > 0 ||
      casts.length > 0 ||
      dvdPrice ||
      dvdDiscount ||
      dvdDateFrom ||
      dvdDateTo

    if (hasValue) {
      openModal({
        title: "확인",
        content: "작성 중인 내용이 있습니다. 정말 목록으로 이동하시겠습니까?",
        type: "confirm",
        fn: () => {
          closeModal()
          navigate("/admin/movie")
        },
      })
    } else {
      navigate("/admin/movie")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!genre) return showAlert({ message: "장르를 선택하세요.", type: "warning" })
    if (!rating) return showAlert({ message: "관람등급을 선택하세요.", type: "warning" })
    if (!title) return showAlert({ message: "제목을 입력하세요.", type: "warning" })
    if (!desc) return showAlert({ message: "설명을 입력하세요.", type: "warning" })
    if (directors.length === 0)
      return showAlert({ message: "감독을 1명 이상 등록하세요.", type: "warning" })
    if (casts.length === 0)
      return showAlert({ message: "출연진을 1명 이상 등록하세요.", type: "warning" })

    if (dvdUse) {
      if (!dvdPrice) return showAlert({ message: "DVD 판매금액을 입력하세요.", type: "warning" })
      if (!dvdDateFrom) return showAlert({ message: "DVD 시작일을 입력하세요.", type: "warning" })
      if (!dvdDateTo) return showAlert({ message: "DVD 종료일을 입력하세요.", type: "warning" })
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("GENRE_CODEA", genre)
      formData.append("RATING_TPCD", rating)
      formData.append("MOVIE_NAME", title)
      formData.append("SYNOPSIS", desc)
      formData.append("TEASER", teaser)
      formData.append(
        "RUNTIME",
        runtime && !isNaN(Number(runtime.trim())) && Number(runtime.trim()) > 0
          ? String(Number(runtime.trim()))
          : "0",
      )
      formData.append("POSTER", posterInput)
      formData.append("BACKGROUND", backgroundInput)

      directors.forEach((d, i) => {
        if (d) formData.append(`DIRECT_CODE${String.fromCharCode(65 + i)}`, d)
      })
      casts.forEach((c, i) => {
        if (c) formData.append(`ACTOR_CODE${String.fromCharCode(65 + i)}`, c)
      })

      formData.append("DVD_USE", dvdUse ? "Y" : "N")
      if (dvdUse) {
        // 할인율이 비어있으면 0으로 처리
        const discountValue = dvdDiscount === "" ? "0" : dvdDiscount
        formData.append("DVD_PRICE", dvdPrice)
        formData.append("DVD_DISCOUNT", discountValue)
        formData.append("DVD_DATE_FROM", dvdDateFrom)
        formData.append("DVD_DATE_TO", dvdDateTo)
      } else {
        formData.append("DVD_PRICE", "")
        formData.append("DVD_DISCOUNT", "0")
        formData.append("DVD_DATE_FROM", "")
        formData.append("DVD_DATE_TO", "")
      }

      if (movieCode) {
        await updateMovie(movieCode, formData)
        showAlert({ message: "수정이 완료되었습니다.", type: "success" })
      } else {
        await createMovie(formData)
        showAlert({ message: "등록이 완료되었습니다.", type: "success" })
      }
      navigate("/admin/movie")
    } catch (err) {
      showAlert({
        message: (movieCode ? "수정" : "등록") + " 실패: " + (err?.message || "알 수 없는 오류"),
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form css={wrapStyle} onSubmit={handleSubmit}>
      <h2 css={titleStyle}>{movieCode ? "영화 수정" : "영화 등록"}</h2>
      <div css={tableWrap}>
        {/* 포스터 */}
        <div css={trStyle}>
          <div css={thStyle}>포스터 이미지 URL</div>
          <div css={tdStyle}>
            <input
              css={inputStyle}
              type="text"
              placeholder="이미지 주소를 입력하세요"
              value={posterInput}
              onChange={handlePosterInputChange}
              style={{ width: 400 }}
            />
            {posterInput && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={posterInput}
                  alt="포스터 미리보기"
                  style={{ width: 120, borderRadius: 8, background: "#eee" }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 32,
                    minHeight: 32,
                    fontSize: 20,
                    p: 0,
                    borderRadius: "50%",
                  }}
                  onClick={handlePosterRemove}
                  title="삭제"
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* 배경사진 */}
        <div css={trStyle}>
          <div css={thStyle}>배경 이미지 URL</div>
          <div css={tdStyle}>
            <input
              css={inputStyle}
              type="text"
              placeholder="배경 이미지 주소를 입력하세요"
              value={backgroundInput}
              onChange={handleBackgroundInputChange}
              style={{ width: 400 }}
            />
            {backgroundInput && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={backgroundInput}
                  alt="배경 미리보기"
                  style={{ width: 240, borderRadius: 8, background: "#eee" }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 32,
                    minHeight: 32,
                    fontSize: 20,
                    p: 0,
                    borderRadius: "50%",
                  }}
                  onClick={handleBackgroundRemove}
                  title="삭제"
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* 장르/등급 */}
        <div css={trStyle}>
          <div css={thStyle}>장르/관람등급</div>
          <div css={tdStyle}>
            <div css={genreRow} style={{ alignItems: "flex-start" }}>
              <div css={genreSelectWrap}>
                <select css={genreSelect} value={genre} onChange={(e) => setGenre(e.target.value)}>
                  <option value="">장르를 선택하세요</option>
                  {genreList.map((g) => (
                    <option key={g.code} value={g.code}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: 32, marginTop: 8 }}>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    checked={rating === "1"}
                    onChange={() => handleRatingChange("1")}
                  />
                  전체
                </label>
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    checked={rating === "2"}
                    onChange={() => handleRatingChange("2")}
                  />
                  성인
                </label>
              </div>
            </div>
          </div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>상영시간(분)</div>
          <div css={tdStyle}>
            <input
              css={inputStyle}
              type="number"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              placeholder="예: 110"
              min={1}
              style={{ width: 120 }}
            />{" "}
          </div>
        </div>
        {/* 제목 */}
        <div css={trStyle}>
          <div css={thStyle}>제목</div>
          <div css={tdStyle}>
            <input
              css={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* 설명 */}
        <div css={trStyle}>
          <div css={thStyle}>설명</div>
          <div css={tdStyle}>
            <textarea
              css={textareaStyle}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={300}
            />
            <div css={descCount}>{desc.length}/300자</div>
          </div>
        </div>
        {/* 티저 */}
        <div css={trStyle}>
          <div css={thStyle}>티저 URL</div>
          <div css={tdStyle}>
            <input
              css={inputStyle}
              value={teaser}
              onChange={(e) => setTeaser(e.target.value)}
              maxLength={300}
              placeholder="티저(예고편) 영상 URL을 입력하세요"
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* 감독 */}
        <div css={trStyle}>
          <div css={thStyle}>감독</div>
          <div css={tdStyle}>
            <div css={chipWrap}>
              {directors.map((d, i) => (
                <span css={chip} key={i}>
                  {getCreatorName(d)}
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      minWidth: 24,
                      minHeight: 24,
                      fontSize: 14,
                      p: 0,
                      borderRadius: "50%",
                      ml: 1,
                    }}
                    onClick={() => removeDirector(d)}
                    title="삭제"
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
            <div css={flexRow} style={{ position: "relative" }}>
              <input
                css={inputStyle}
                value={directorInput}
                onChange={(e) => setDirectorInput(e.target.value)}
                placeholder="감독명(한글)"
                style={{ width: 200 }}
                autoComplete="off"
              />
              {directorInput && (
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    zIndex: 10,
                    width: 200,
                    maxHeight: 120,
                    overflowY: "auto",
                  }}
                >
                  {filteredDirectorOptions.length === 0 && (
                    <div style={{ padding: 8, color: "#888" }}>검색 결과 없음</div>
                  )}
                  {filteredDirectorOptions.map((c) => (
                    <div
                      key={c.code}
                      style={{ padding: 8, cursor: "pointer" }}
                      onClick={() => addDirector(c.code)}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outlined"
                sx={{ ml: 1, minWidth: 60, fontWeight: 600 }}
                onClick={() => {
                  const found = creatorList.find((c) => c.name === directorInput)
                  if (found) addDirector(found.code)
                }}
              >
                등록
              </Button>
            </div>
          </div>
        </div>
        {/* 출연진 */}
        <div css={trStyle}>
          <div css={thStyle}>출연진</div>
          <div css={tdStyle}>
            <div css={chipWrap}>
              {casts.map((c, i) => (
                <span css={chip} key={i}>
                  {getCreatorName(c)}
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      minWidth: 24,
                      minHeight: 24,
                      fontSize: 14,
                      p: 0,
                      borderRadius: "50%",
                      ml: 1,
                    }}
                    onClick={() => removeCast(c)}
                    title="삭제"
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
            <div css={flexRow} style={{ position: "relative" }}>
              <input
                css={inputStyle}
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="출연진명(한글)"
                style={{ width: 200 }}
                autoComplete="off"
              />
              {castInput && (
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    zIndex: 10,
                    width: 200,
                    maxHeight: 120,
                    overflowY: "auto",
                  }}
                >
                  {filteredCastOptions.length === 0 && (
                    <div style={{ padding: 8, color: "#888" }}>검색 결과 없음</div>
                  )}
                  {filteredCastOptions.map((c) => (
                    <div
                      key={c.code}
                      style={{ padding: 8, cursor: "pointer" }}
                      onClick={() => addCast(c.code)}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outlined"
                sx={{ ml: 1, minWidth: 60, fontWeight: 600 }}
                onClick={() => {
                  const found = creatorList.find((c) => c.name === castInput)
                  if (found) addCast(found.code)
                }}
              >
                등록
              </Button>
            </div>
          </div>
        </div>
        {/* DVD 시스템 */}
        <div css={trStyle}>
          <div css={thStyle} style={{ verticalAlign: "top" }}>
            DVD 시스템
          </div>
          <div css={tdStyle}>
            <div>
              <label css={checkLabel}>
                <input type="radio" checked={dvdUse} onChange={() => setDvdUse(true)} /> 사용
              </label>
              <label css={checkLabel}>
                <input type="radio" checked={!dvdUse} onChange={() => setDvdUse(false)} /> 미사용
              </label>
            </div>
            {dvdUse && (
              <div css={systemInputRow}>
                <input
                  css={inputStyle}
                  type="number"
                  placeholder="판매금액"
                  value={dvdPrice}
                  onChange={(e) => setDvdPrice(e.target.value)}
                  style={{ width: 120 }}
                />{" "}
                원
                <input
                  css={inputStyle}
                  type="number"
                  placeholder="할인율"
                  value={dvdDiscount}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "")
                    if (value === "") value = ""
                    else if (Number(value) < 1) value = "1"
                    else if (Number(value) > 100) value = "100"
                    setDvdDiscount(value)
                  }}
                  style={{ marginLeft: 8, width: 120 }}
                  min={1}
                  max={100}
                />{" "}
                %
                <input
                  css={inputStyle}
                  type="date"
                  value={dvdDateFrom}
                  onChange={(e) => setDvdDateFrom(e.target.value)}
                  style={{ marginLeft: 8, width: 140 }}
                />
                ~
                <input
                  css={inputStyle}
                  type="date"
                  value={dvdDateTo}
                  onChange={(e) => setDvdDateTo(e.target.value)}
                  style={{ marginLeft: 8, width: 140 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div css={btnRow}>
        <Button
          variant="outlined"
          sx={{ minWidth: 120, fontWeight: 600, fontSize: 17 }}
          type="button"
          onClick={handleListClick}
        >
          목록
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 120, fontWeight: 700, fontSize: 17 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (movieCode ? "수정중..." : "등록중...") : movieCode ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  )
}

// --- 스타일 ---
const wrapStyle = css`
  max-width: 1200px;
  min-width: 320px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  padding: 36px 0 32px 0;
  box-shadow: 0 2px 16px #0001;
  @media (max-width: 900px) {
    padding: 24px 0 24px 0;
  }
`
const titleStyle = css`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 36px;
  color: #222;
  letter-spacing: -1px;
  padding-left: 48px;
  @media (max-width: 900px) {
    font-size: 24px;
    padding-left: 20px;
  }
`
const tableWrap = css`
  width: 100%;
  margin-bottom: 36px;
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid #e0e0e0;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0;
`
const trStyle = css`
  display: flex;
  align-items: stretch;
  border-bottom: 1.5px solid #e0e0e0;
  &:last-of-type {
    border-bottom: none;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    border-bottom: none;
    margin-bottom: 18px;
    background: #fff;
  }
`
const thStyle = css`
  width: 160px;
  min-width: 100px;
  background: #f5f5f5;
  font-weight: 600;
  color: #222;
  font-size: 16px;
  padding: 24px 18px 24px 24px;
  border-right: 1.5px solid #e0e0e0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 14px 12px 10px 14px;
    font-size: 15px;
    justify-content: flex-start;
  }
`
const tdStyle = css`
  flex: 1;
  padding: 24px 32px 24px 24px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  @media (max-width: 900px) {
    padding: 16px 12px 18px 14px;
  }
`
const genreRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`
const flexRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`
const inputStyle = css`
  padding: 7px 12px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
  margin-right: 4px;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #ff9800;
    outline: none;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 6px 8px;
    min-width: 0;
    width: 100%;
    margin-bottom: 6px;
  }
`
const textareaStyle = css`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: 100px;
  padding: 10px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  resize: none;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #ff9800;
    outline: none;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    height: 70px;
    padding: 8px;
  }
`
const descCount = css`
  font-size: 12px;
  color: #888;
  text-align: right;
  margin-top: 2px;
`
const chipWrap = css`
  margin-bottom: 8px;
`
const chip = css`
  display: inline-flex;
  align-items: center;
  background: #ffe0b2;
  color: #ff9800;
  border-radius: 12px;
  padding: 3px 8px 3px 12px;
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 4px;
`
const btnRow = css`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 44px;
  padding: 0 40px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    padding: 0 12px;
  }
`
const checkLabel = css`
  margin-right: 16px;
  font-size: 15px;
  input {
    margin-right: 4px;
  }
`
const systemInputRow = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`
const genreSelectWrap = css`
  min-width: 200px;
  max-width: 260px;
  max-height: 220px;
  overflow-y: auto;
`
const genreSelect = css`
  width: 100%;
  min-width: 180px;
  max-width: 240px;
  font-size: 15px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  outline: none;
  box-sizing: border-box;
`
