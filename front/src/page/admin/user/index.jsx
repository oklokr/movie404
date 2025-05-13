import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { css } from "@emotion/react"
import { fetchUserList } from "@/api/admin"

const PAGE_SIZE = 5

export default function AdminUser() {
  const [users, setUsers] = useState([])
  const [inputSearch, setInputSearch] = useState("")
  const [inputType, setInputType] = useState("전체")
  const [search, setSearch] = useState("")
  const [type, setType] = useState("전체")
  const navigate = useNavigate()
  const location = useLocation()

  // 쿼리스트링에서 page 읽기
  const getPageFromQuery = () => {
    const params = new URLSearchParams(location.search)
    const pageParam = parseInt(params.get("page"), 10)
    return isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  }
  const [page, setPage] = useState(getPageFromQuery())

  // 쿼리스트링 page 변경 감지
  useEffect(() => {
    setPage(getPageFromQuery())
    // eslint-disable-next-line
  }, [location.search])

  // 페이지 변경 시 쿼리스트링 반영
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search)
    params.set("page", String(newPage))
    navigate({ search: params.toString() })
  }

  useEffect(() => {
    fetchUserList()
      .then((data) => {
        if (!Array.isArray(data)) {
          setUsers([])
          return
        }
        setUsers(
          data.map((u) => ({
            id: u.userId,
            name: u.userName,
            email: u.email,
            tel: u.tel,
            date: u.signupDateStr || u.signupDate,
            type: (() => {
              switch (u.userTpcd) {
                case 1:
                case "1":
                  return "일반회원"
                case 2:
                case "2":
                  return "관리자"
                case 3:
                case "3":
                  return "VIP회원"
                case 4:
                case "4":
                  return "탈퇴회원"
                default:
                  return "일반회원"
              }
            })(),
          })),
        )
      })
      .catch(() => setUsers([]))
  }, [])

  const filtered = users.filter((u) => {
    const matchType = type === "전체" || u.type === type
    const matchName = u.name.includes(search)
    return matchType && matchName
  })

  const totalPage = Math.ceil(filtered.length / PAGE_SIZE)
  const pagedUsers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(inputSearch)
    setType(inputType)
    handlePageChange(1)
  }
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value)
  }
  const handleInputSearchChange = (e) => {
    setInputSearch(e.target.value)
  }

  // 상세로 이동 시 현재 페이지 쿼리스트링도 같이 전달
  const goDetail = (id) => {
    navigate(`/admin/user/${id}?page=${page}`)
  }

  return (
    <div css={outerWrap}>
      <div css={mainBox}>
        <form css={filterBox} onSubmit={handleSearch}>
          <div css={filterRow}>
            <label css={filterLabel}>
              회원명
              <input
                type="text"
                placeholder="회원명"
                css={inputStyle}
                value={inputSearch}
                onChange={handleInputSearchChange}
              />
            </label>
            <label css={filterLabel}>
              구분
              <select css={selectStyle} value={inputType} onChange={handleInputTypeChange}>
                <option>전체</option>
                <option>일반회원</option>
                <option>VIP회원</option>
                <option>탈퇴회원</option>
                <option>관리자</option>
              </select>
            </label>
            <button css={btnStyle} type="submit">
              검색
            </button>
          </div>
        </form>
        <div css={countText}>
          총 <b>{filtered.length}</b> 개
        </div>
        <div css={listWrap}>
          <dl css={listHeader}>
            <div>구분</div>
            <div>회원명</div>
            <div>회원 ID</div>
            <div>이메일</div>
            <div>전화번호</div>
            <div>가입일자</div>
          </dl>
          {pagedUsers.length === 0 ? (
            <div css={emptyRow}>회원 정보가 없습니다.</div>
          ) : (
            pagedUsers.map((u, i) => (
              <dl css={listRow} key={i}>
                <div>{u.type}</div>
                <div css={clickableCell} onClick={() => goDetail(u.id)}>
                  {u.name}
                </div>
                <div css={clickableCell} onClick={() => goDetail(u.id)}>
                  {u.id}
                </div>
                <div>{u.email}</div>
                <div>{u.tel}</div>
                <div>{u.date}</div>
              </dl>
            ))
          )}
        </div>
        <div css={paginationStyle}>
          {[...Array(totalPage)].map((_, idx) => (
            <button
              key={idx}
              className={page === idx + 1 ? "active" : ""}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const outerWrap = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 600px;
  background: none;
`
const mainBox = css`
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
  padding: 32px 32px 40px 32px;
  margin-top: 8px;
  border: 1.5px solid #e0e0e0;
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
const selectStyle = css`
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
  > div {
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
  > div {
    flex: 1;
    padding: 13px 8px;
    text-align: center;
  }
  &:last-of-type {
    border-radius: 0 0 6px 6px;
  }
`
const clickableCell = css`
  cursor: pointer;
  color: #0078d4;
  text-decoration: underline;
  &:hover {
    color: #ff9800;
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
