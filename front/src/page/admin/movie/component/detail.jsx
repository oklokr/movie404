import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { fetchMovieDetail, deleteMovie, fetchGenreList, fetchCreatorList } from "@/api/admin"
import { css } from "@emotion/react"

export default function MovieDetail() {
  const { movieCode } = useParams()
  const [movie, setMovie] = useState(null)
  const [genreList, setGenreList] = useState([])
  const [creatorList, setCreatorList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchMovieDetail(movieCode).then(setMovie)
    fetchGenreList().then((res) => setGenreList(res.data ? res.data : res))
    fetchCreatorList().then((res) => setCreatorList(res.data ? res.data : res))
  }, [movieCode])

  const getGenreName = (code) => genreList.find((g) => g.code === code)?.name || code
  const getCreatorName = (code) => creatorList.find((c) => c.code === code)?.name || code

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteMovie(movieCode)
        alert("삭제되었습니다.")
        navigate("/admin/movie")
      } catch (e) {
        alert("삭제 실패: " + (e?.message || "알 수 없는 오류"))
      }
    }
  }

  if (!movie) return <div css={wrapStyle}>로딩중...</div>

  return (
    <div css={wrapStyle}>
      <div css={titleStyle}>영화 상세</div>
      <div css={tableWrap}>
        <DetailRow label="포스터">
          <div css={posterArea}>
            {movie.poster ? (
              <div css={posterThumbWrap}>
                <img src={movie.poster} alt="포스터" css={posterImg} />
              </div>
            ) : (
              <span>이미지 없음</span>
            )}
          </div>
        </DetailRow>
        {/* 배경사진 */}
        <DetailRow label="배경 이미지">
          <div css={posterArea}>
            {movie.background ? (
              <div css={backgroundThumbWrap}>
                <img src={movie.background} alt="배경" css={backgroundImg} />
              </div>
            ) : (
              <span>이미지 없음</span>
            )}
          </div>
        </DetailRow>
        <DetailRow label="영화명">{movie.movieName}</DetailRow>
        <DetailRow label="장르">{getGenreName(movie.genreCodeA)}</DetailRow>
        <DetailRow label="관람등급">
          {movie.ratingTpcd === "1" ? "전체" : movie.ratingTpcd === "2" ? "성인" : movie.ratingTpcd}
        </DetailRow>
        <DetailRow label="상영시간">{movie.runtime}</DetailRow>
        <DetailRow label="설명">{movie.synopsis}</DetailRow>
        <DetailRow label="티저 URL">
          {movie.teaser ? (
            <a href={movie.teaser} target="_blank" rel="noopener noreferrer">
              {movie.teaser}
            </a>
          ) : (
            <span>없음</span>
          )}
        </DetailRow>
        <DetailRow label="감독">
          {[movie.directCodeA, movie.directCodeB].filter(Boolean).map(getCreatorName).join(", ")}
        </DetailRow>
        <DetailRow label="출연진">
          {[
            movie.actorCodeA,
            movie.actorCodeB,
            movie.actorCodeC,
            movie.actorCodeD,
            movie.actorCodeE,
          ]
            .filter(Boolean)
            .map(getCreatorName)
            .join(", ")}
        </DetailRow>
        <DetailRow label="DVD 가격">
          {movie.dvdPrice ? `${movie.dvdPrice.toLocaleString()} 원` : ""}
        </DetailRow>
        <DetailRow label="DVD 할인율">
          {movie.dvdDiscount != null && movie.dvdDiscount !== "" ? `${movie.dvdDiscount}%` : ""}
        </DetailRow>
        <DetailRow label="DVD 판매기간">
          {movie.dvdDateFrom && movie.dvdDateTo ? `${movie.dvdDateFrom} ~ ${movie.dvdDateTo}` : ""}
        </DetailRow>
      </div>
      <div css={btnRow}>
        <button css={listBtn} onClick={() => navigate(-1)}>
          목록
        </button>
        <div>
          <button
            css={miniBtn}
            style={{ background: "#ff9800", color: "#fff" }}
            onClick={() => navigate(`/admin/movie/edit/${movie.movieCode}`)}
          >
            수정
          </button>
          <button
            css={miniBtn}
            style={{ marginLeft: 12, background: "#d32f2f", color: "#fff" }}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, children }) {
  return (
    <div css={trStyle}>
      <div css={thStyle}>{label}</div>
      <div css={tdStyle}>{children}</div>
    </div>
  )
}

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
const backgroundThumbWrap = css`
  width: 240px;
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
    width: 120px;
    height: 60px;
  }
`
const backgroundImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
