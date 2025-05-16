import { useEffect, useState } from "react"
import { fetchMovieList } from "@/api/admin"
import { css } from "@emotion/react"
import { useNavigate, useLocation } from "react-router-dom"

const PAGE_SIZE = 10

export default function Movie() {
  const [list, setList] = useState([])
  const [movieName, setMovieName] = useState("")
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  // 쿼리스트링에서 page 읽기
  const params = new URLSearchParams(location.search)
  const initialPage = parseInt(params.get("page") || "1", 10)
  const [page, setPage] = useState(initialPage)

  const getList = async (name = "", pageNum = 1) => {
    const res = await fetchMovieList({ movieName: name, page: pageNum, size: PAGE_SIZE })
    const data = res.data || res
    setList(data.list || [])
    setTotal(data.total || 0)
  }

  useEffect(() => {
    getList(movieName, page)
    // eslint-disable-next-line
  }, [page])

  // page 변경 시 쿼리스트링도 변경
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (page !== parseInt(params.get("page") || "1", 10)) {
      params.set("page", String(page))
      navigate({ search: params.toString() }, { replace: true })
    }
    // eslint-disable-next-line
  }, [page])

  const handleSearch = () => {
    setPage(1)
    getList(movieName, 1)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const pageGroupSize = 10
  const groupIndex = Math.floor((page - 1) / pageGroupSize)
  const groupStart = groupIndex * pageGroupSize + 1
  const groupEnd = Math.min(groupStart + pageGroupSize - 1, totalPages)

  return (
    <div>
      <div css={filterBox}>
        <label css={filterLabel}>영화명</label>
        <input
          css={inputStyle}
          placeholder="영화명"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />
        <button css={btnStyle} onClick={handleSearch}>
          검색
        </button>
      </div>
      <div css={countText}>
        총 <b>{total.toLocaleString()}</b> 개
        <button
          css={registerBtn}
          style={{ float: "right" }}
          onClick={() => navigate("/admin/movie/edit?page=" + page)}
        >
          등록
        </button>
      </div>
      <div css={listWrap}>
        <dl css={listHeader}>
          <dt>영화번호</dt>
          <dt>영화명</dt>
          <dt>포스터</dt>
          <dt>DVD 금액</dt>
          <dt>DVD 할인금액</dt>
        </dl>
        {list.length === 0 ? (
          <div css={emptyRow}>영화가 없습니다.</div>
        ) : (
          list.map((row) => (
            <dl
              css={listRow}
              key={row.movieCode}
              onClick={() => navigate(`/admin/movie/${row.movieCode}?page=${page}`)}
              style={{ cursor: "pointer" }}
            >
              <dd>{row.movieCode}</dd>
              <dd>{row.movieName}</dd>
              <dd>
                {row.poster && typeof row.poster === "string" && row.poster.trim() !== "" ? (
                  <img
                    src={row.poster}
                    alt="포스터"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 6,
                      background: "#eee",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                    }}
                    onError={(e) => {
                      const target = e.target
                      if (target instanceof HTMLImageElement) {
                        target.style.display = "none"
                      }
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "#eee",
                      borderRadius: 6,
                      margin: "0 auto",
                    }}
                  />
                )}
              </dd>
              <dd>{row.dvdPrice?.toLocaleString()} 원</dd>
              <dd>{row.dvdDiscount?.toLocaleString()} 원</dd>
            </dl>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div css={paginationStyle}>
          <button onClick={() => setPage(groupStart - 1)} disabled={groupStart === 1}>
            &lt;
          </button>
          {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i).map((p) => (
            <button key={p} className={page === p ? "active" : ""} onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(groupEnd + 1)} disabled={groupEnd === totalPages}>
            &gt;
          </button>
        </div>
      )}
    </div>
  )
}

const titleStyle = css`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #222;
`
const tabWrap = css`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  .tab {
    flex: 1;
    padding: 14px 0;
    font-size: 17px;
    font-weight: 600;
    border: 1.5px solid #ddd;
    border-bottom: none;
    background: #f5f5f5;
    color: #888;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    transition: background 0.2s;
    &.active {
      background: #fff;
      color: #222;
      border-bottom: 1.5px solid #fff;
    }
    &:not(:first-of-type) {
      border-left: none;
    }
  }
`
const filterBox = css`
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fafbfc;
  padding: 24px 24px 16px 24px;
  margin-bottom: 18px;
`
const filterRow = css`
  display: flex;
  gap: 24px;
  align-items: center;
`
const filterLabel = css`
  font-weight: 500;
  font-size: 15px;
  color: #222;
`
const inputStyle = css`
  margin-left: 8px;
  padding: 7px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
`
const btnStyle = css`
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  background: #222;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  margin-left: 12px;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const registerBtn = css`
  padding: 7px 18px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #888;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  margin-left: 12px;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const countText = css`
  margin-bottom: 10px;
  font-size: 15px;
  color: #444;
  b {
    color: #ff9800;
    font-weight: 700;
  }
`
const listWrap = css`
  margin-top: 10px;
`
const listHeader = css`
  display: flex;
  background: #f5f5f5;
  font-weight: 600;
  border-radius: 6px 6px 0 0;
  border: 1.5px solid #ddd;
  border-bottom: none;
  > dt {
    flex: 1;
    padding: 14px 8px;
    text-align: center;
    font-size: 15px;
  }
`
const listRow = css`
  display: flex;
  border: 1.5px solid #ddd;
  border-top: none;
  font-size: 15px;
  transition: background 0.15s;
  > dd {
    flex: 1;
    padding: 13px 8px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  &:last-of-type {
    border-radius: 0 0 6px 6px;
  }
  cursor: pointer;
  &:hover {
    background: #fffbe7;
  }
`
const emptyRow = css`
  padding: 40px 0;
  text-align: center;
  color: #888;
  font-size: 16px;
  border: 1.5px solid #ddd;
  border-top: none;
  border-radius: 0 0 6px 6px;
`
const paginationStyle = css`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  button {
    border: none;
    background: #f5f5f5;
    color: #222;
    padding: 7px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    &.active {
      background: #ff9800;
      color: #fff;
      font-weight: 700;
    }
    &:hover:not(.active) {
      background: #ffe0b2;
    }
  }
`
