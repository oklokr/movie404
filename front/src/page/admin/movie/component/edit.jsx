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

export default function MovieEdit() {
  const navigate = useNavigate()
  const { movieCode } = useParams()
  // 폼 상태
  const [poster, setPoster] = useState(null)
  const [posterFile, setPosterFile] = useState(null)
  const [genreList, setGenreList] = useState([])
  const [genre, setGenre] = useState("") // 단일 선택
  const [rating, setRating] = useState("") // "1" or "2" 단일 선택
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [directors, setDirectors] = useState([])
  const [directorInput, setDirectorInput] = useState("")
  const [casts, setCasts] = useState([])
  const [castInput, setCastInput] = useState("")
  const [dvdUse, setDvdUse] = useState(true)
  const [dvdPrice, setDvdPrice] = useState("")
  const [dvdDiscount, setDvdDiscount] = useState("")
  const [dvdDateFrom, setDvdDateFrom] = useState("")
  const [dvdDateTo, setDvdDateTo] = useState("")
  const [reserveUse, setReserveUse] = useState(true)
  const [reservePrice, setReservePrice] = useState("")
  const [reserveDiscount, setReserveDiscount] = useState("")
  const [reserveDateFrom, setReserveDateFrom] = useState("")
  const [reserveDateTo, setReserveDateTo] = useState("")
  const [loading, setLoading] = useState(false)
  const [runtime, setRuntime] = useState("")
  const [creatorList, setCreatorList] = useState([])

  // 장르/크리에이터 목록 불러오기
  useEffect(() => {
    fetchGenreList().then((res) => {
      setGenreList(res.data ? res.data : res)
    })
    fetchCreatorList().then((res) => {
      setCreatorList(res.data ? res.data : res)
    })
  }, [])

  // 수정 모드: 기존 데이터 불러오기
  useEffect(() => {
    if (!movieCode) return
    fetchMovieDetail(movieCode).then((res) => {
      const movie = res.data ? res.data : res
      setPoster(movie.poster)
      setGenre(movie.genreCodeA || "")
      setRating(movie.ratingTpcd || "")
      setTitle(movie.movieName || "")
      setDesc(movie.synopsis || "")
      setDirectors(movie.directorCode ? [movie.directorCode] : [])
      setCasts(movie.actorCode ? [movie.actorCode] : [])
      setDvdPrice(movie.dvdPrice || "")
      setReservePrice(movie.reservePrice || "")
    })
  }, [movieCode])

  // 포스터 업로드
  const handlePosterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPoster(URL.createObjectURL(file))
      setPosterFile(file)
    }
  }
  // 포스터 삭제
  const handlePosterRemove = () => {
    setPoster(null)
    setPosterFile(null)
  }

  // 자동완성 필터
  const filteredDirectorOptions = creatorList.filter(
    (c) => c.name.includes(directorInput) && !directors.includes(c.code),
  )
  const filteredCastOptions = creatorList.filter(
    (c) => c.name.includes(castInput) && !casts.includes(c.code),
  )

  // 감독 추가/삭제 (코드 기반)
  const addDirector = (code) => {
    if (!code) return
    if (!directors.includes(code)) {
      setDirectors([...directors, code])
      setDirectorInput("")
    }
  }
  const removeDirector = (code) => {
    setDirectors(directors.filter((d) => d !== code))
  }

  // 출연진 추가/삭제 (코드 기반)
  const addCast = (code) => {
    if (!code) return
    if (!casts.includes(code)) {
      setCasts([...casts, code])
      setCastInput("")
    }
  }
  const removeCast = (code) => {
    setCasts(casts.filter((c) => c !== code))
  }

  // chip에 한글 이름 표시
  const getCreatorName = (code) => {
    const c = creatorList.find((c) => c.code === code)
    return c ? c.name : code
  }

  // 장르 카테고리 버튼 핸들러 (단일 선택)
  const handleGenreSelect = (code) => {
    setGenre(code)
  }

  // 관람등급 라디오 핸들러 (1: 전체, 2: 성인)
  const handleRatingChange = (value) => {
    setRating(value)
  }

  // 목록 버튼 클릭 시 작성된 값이 있으면 확인 후 이동
  const handleListClick = () => {
    const hasValue =
      posterFile ||
      genre ||
      rating ||
      title ||
      desc ||
      directors.length > 0 ||
      casts.length > 0 ||
      dvdPrice ||
      dvdDiscount ||
      dvdDateFrom ||
      dvdDateTo ||
      reservePrice ||
      reserveDiscount ||
      reserveDateFrom ||
      reserveDateTo

    if (hasValue) {
      if (window.confirm("작성 중인 내용이 있습니다. 정말 목록으로 이동하시겠습니까?")) {
        navigate("/admin/movie")
      }
    } else {
      navigate("/admin/movie")
    }
  }

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!genre) return alert("장르를 선택하세요.")
    if (!rating) return alert("관람등급을 선택하세요.")
    if (!title) return alert("제목을 입력하세요.")
    if (!desc) return alert("설명을 입력하세요.")
    if (directors.length === 0) return alert("감독을 1명 이상 등록하세요.")
    if (casts.length === 0) return alert("출연진을 1명 이상 등록하세요.")

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("GENRE_CODEA", genre)
      formData.append("RATING_TPCD", rating)
      formData.append("MOVIE_NAME", title)
      formData.append("SYNOPSIS", desc)
      formData.append("RUNTIME", runtime)
      if (posterFile) formData.append("POSTER", posterFile)

      // 감독 코드 추가 (빈 값 제외)
      directors.forEach((d, i) => {
        if (d) formData.append(`DIRECT_CODE${String.fromCharCode(65 + i)}`, d)
      })
      // 출연진 코드 추가 (빈 값 제외)
      casts.forEach((c, i) => {
        if (c) formData.append(`ACTOR_CODE${String.fromCharCode(65 + i)}`, c)
      })

      formData.append("DVD_USE", dvdUse ? "Y" : "N")
      if (dvdUse) {
        formData.append("DVD_PRICE", dvdPrice)
        formData.append("DVD_DISCOUNT", dvdDiscount)
        formData.append("DVD_DATE_FROM", dvdDateFrom)
        formData.append("DVD_DATE_TO", dvdDateTo)
      }
      formData.append("RESERVE_USE", reserveUse ? "Y" : "N")
      if (reserveUse) {
        formData.append("RESERVE_PRICE", reservePrice)
        formData.append("RESERVE_DISCOUNT", reserveDiscount)
        formData.append("RESERVE_DATE_FROM", reserveDateFrom)
        formData.append("RESERVE_DATE_TO", reserveDateTo)
      }
      if (movieCode) {
        await updateMovie(movieCode, formData)
        alert("수정이 완료되었습니다.")
      } else {
        await createMovie(formData)
        alert("등록이 완료되었습니다.")
      }
      navigate("/admin/movie")
    } catch (err) {
      alert((movieCode ? "수정" : "등록") + " 실패: " + (err?.message || "알 수 없는 오류"))
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
          <div css={thStyle}>포스터 이미지</div>
          <div css={tdStyle}>
            <div css={posterArea}>
              {poster ? (
                <div css={posterThumbWrap}>
                  <img src={poster} alt="포스터" css={posterImg} />
                  <button type="button" css={posterDelBtn} onClick={handlePosterRemove}>
                    ×
                  </button>
                </div>
              ) : null}
              <label css={posterAddBtn}>
                <div css={plusIcon}>+</div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePosterChange}
                />
              </label>
            </div>
          </div>
        </div>
        {/* 장르/등급 */}
        <div css={trStyle}>
          <div css={thStyle}>장르/관람등급</div>
          <div css={tdStyle}>
            <div css={genreRow} style={{ alignItems: "flex-start" }}>
              {/* 장르 드롭다운(기본 select) */}
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
              {/* 관람등급 라디오 */}
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
        {/* 감독 */}
        <div css={trStyle}>
          <div css={thStyle}>감독</div>
          <div css={tdStyle}>
            <div css={chipWrap}>
              {directors.map((d, i) => (
                <span css={chip} key={i}>
                  {getCreatorName(d)}
                  <button
                    type="button"
                    css={chipDelBtn}
                    onClick={() => removeDirector(d)}
                    title="삭제"
                  >
                    ×
                  </button>
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
              <button
                type="button"
                css={miniBtn}
                onClick={() => {
                  const found = creatorList.find((c) => c.name === directorInput)
                  if (found) addDirector(found.code)
                }}
              >
                등록
              </button>
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
                  <button type="button" css={chipDelBtn} onClick={() => removeCast(c)} title="삭제">
                    ×
                  </button>
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
              <button
                type="button"
                css={miniBtn}
                onClick={() => {
                  const found = creatorList.find((c) => c.name === castInput)
                  if (found) addCast(found.code)
                }}
              >
                등록
              </button>
            </div>
          </div>
        </div>
        {/* DVD/예매 시스템 */}
        <div css={trStyle}>
          <div css={thStyle} style={{ verticalAlign: "top" }}>
            DVD/예매 시스템
          </div>
          <div css={tdStyle}>
            <div css={systemWrap}>
              <div css={systemCol}>
                <div css={systemTitle}>DVD 시스템</div>
                <div>
                  <label css={checkLabel}>
                    <input type="radio" checked={dvdUse} onChange={() => setDvdUse(true)} /> 사용
                  </label>
                  <label css={checkLabel}>
                    <input type="radio" checked={!dvdUse} onChange={() => setDvdUse(false)} />{" "}
                    미사용
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
                      placeholder="할인금액"
                      value={dvdDiscount}
                      onChange={(e) => setDvdDiscount(e.target.value)}
                      style={{ marginLeft: 8, width: 120 }}
                    />{" "}
                    원
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
              <div css={systemCol}>
                <div css={systemTitle}>예매 시스템</div>
                <div>
                  <label css={checkLabel}>
                    <input type="radio" checked={reserveUse} onChange={() => setReserveUse(true)} />{" "}
                    사용
                  </label>
                  <label css={checkLabel}>
                    <input
                      type="radio"
                      checked={!reserveUse}
                      onChange={() => setReserveUse(false)}
                    />{" "}
                    미사용
                  </label>
                </div>
                {reserveUse && (
                  <div css={systemInputRow}>
                    <input
                      css={inputStyle}
                      type="number"
                      placeholder="판매금액"
                      value={reservePrice}
                      onChange={(e) => setReservePrice(e.target.value)}
                      style={{ width: 120 }}
                    />{" "}
                    원
                    <input
                      css={inputStyle}
                      type="number"
                      placeholder="할인금액"
                      value={reserveDiscount}
                      onChange={(e) => setReserveDiscount(e.target.value)}
                      style={{ marginLeft: 8, width: 120 }}
                    />{" "}
                    원
                    <input
                      css={inputStyle}
                      type="date"
                      value={reserveDateFrom}
                      onChange={(e) => setReserveDateFrom(e.target.value)}
                      style={{ marginLeft: 8, width: 140 }}
                    />
                    ~
                    <input
                      css={inputStyle}
                      type="date"
                      value={reserveDateTo}
                      onChange={(e) => setReserveDateTo(e.target.value)}
                      style={{ marginLeft: 8, width: 140 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div css={btnRow}>
        <button type="button" css={listBtn} onClick={handleListClick}>
          목록
        </button>
        <button type="submit" css={submitBtn} disabled={loading}>
          {loading ? (movieCode ? "수정중..." : "등록중...") : movieCode ? "수정" : "등록"}
        </button>
      </div>
    </form>
  )
}

// 스타일
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
const posterArea = css`
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`
const posterThumbWrap = css`
  width: 120px;
  height: 120px;
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1.5px solid #e0e0e0;
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`
const posterImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const posterDelBtn = css`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #fff;
  border: 1.5px solid #ff9800;
  color: #ff9800;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    color 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`
const posterAddBtn = css`
  width: 120px;
  height: 120px;
  background: #f5f5f5;
  border-radius: 8px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.2s;
  &:hover {
    border: 2px solid #ff9800;
    background: #fffbe7;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`
const plusIcon = css`
  font-size: 48px;
  color: #bbb;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 32px;
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
const chipDelBtn = css`
  background: none;
  border: none;
  color: #ff9800;
  font-size: 16px;
  margin-left: 4px;
  cursor: pointer;
  padding: 0 2px;
  &:hover {
    color: #d32f2f;
  }
`
const miniBtn = css`
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const systemWrap = css`
  display: flex;
  gap: 24px;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`
const systemCol = css`
  flex: 1 1 0;
  min-width: 240px;
  background: #fafbfc;
  border-radius: 10px;
  padding: 18px 24px 18px 24px;
  border: 1.5px solid #e0e0e0;
  box-sizing: border-box;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 600px) {
    padding: 12px 8px;
    min-width: 0;
  }
`
const systemTitle = css`
  font-weight: 600;
  font-size: 16px;
  color: #ff9800;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const systemInputRow = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`
const checkLabel = css`
  margin-right: 16px;
  font-size: 15px;
  input {
    margin-right: 4px;
  }
`
const btnRow = css`
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
  padding: 0 40px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    padding: 0 12px;
  }
`
const listBtn = css`
  padding: 12px 36px;
  border: none;
  border-radius: 6px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
  }
`
const submitBtn = css`
  padding: 12px 36px;
  border: none;
  border-radius: 6px;
  background: #222;
  color: #fff;
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
  }
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
