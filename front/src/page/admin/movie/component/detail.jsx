import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchMovieDetail } from "@/api/admin"
import { css } from "@emotion/react"

export default function MovieDetail() {
  const { movieCode } = useParams()
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMovieDetail(movieCode).then(setMovie)
  }, [movieCode])

  if (!movie) return <div css={wrapStyle}>로딩중...</div>

  return (
    <div css={wrapStyle}>
      <div css={titleStyle}>영화 상세</div>
      <div css={tableWrap}>
        <div css={trStyle}>
          <div css={thStyle}>포스터</div>
          <div css={tdStyle}>
            <div css={posterArea}>
              {movie.poster ? (
                <div css={posterThumbWrap}>
                  <img src={movie.poster} alt="포스터" css={posterImg} />
                </div>
              ) : (
                <span>이미지 없음</span>
              )}
            </div>
          </div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>영화명</div>
          <div css={tdStyle}>{movie.movieName}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>장르</div>
          <div css={tdStyle}>{movie.genreCode}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>감독</div>
          <div css={tdStyle}>{movie.directorCode}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>배우</div>
          <div css={tdStyle}>{movie.actorCode}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>상영시간</div>
          <div css={tdStyle}>{movie.runtime}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>등급</div>
          <div css={tdStyle}>{movie.rating}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>개봉일</div>
          <div css={tdStyle}>{movie.releaseDate}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>DVD 가격</div>
          <div css={tdStyle}>{movie.dvdPrice}</div>
        </div>
        <div css={trStyle}>
          <div css={thStyle}>예매 가격</div>
          <div css={tdStyle}>{movie.reservePrice}</div>
        </div>
      </div>
      <button css={miniBtn} onClick={() => navigate(-1)}>
        목록
      </button>
      <button
        css={miniBtn}
        style={{ marginLeft: 12, background: "#ff9800", color: "#fff" }}
        onClick={() => navigate(`/admin/movie/edit/${movie.movieCode}`)}
      >
        수정
      </button>
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
