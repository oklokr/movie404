import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { css } from "@emotion/react"
import { fetchUserList } from "@/api/admin"
import Button from "@mui/material/Button"
import { useModal } from "@/component/modalProvider"

const PAGE_SIZE = 5

export default function AdminUser() {
  const [users, setUsers] = useState([])
  const [inputSearch, setInputSearch] = useState("")
  const [inputType, setInputType] = useState("전체")
  const [search, setSearch] = useState("")
  const [type, setType] = useState("전체")
  const navigate = useNavigate()
  const location = useLocation()
  const { showAlert } = useModal()

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
          showAlert({ message: "회원 목록을 불러올 수 없습니다.", type: "error" })
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
      .catch(() => {
        setUsers([])
        showAlert({ message: "회원 목록을 불러올 수 없습니다.", type: "error" })
      })
  }, [showAlert])

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

  // 페이지네이션 파란색 스타일
  return (
    <div>
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
          <Button
            variant="contained"
            type="submit"
            sx={{ ml: 2, minWidth: 90, fontWeight: 600, fontSize: 15 }}
          >
            검색
          </Button>
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
            <dl
              css={listRow}
              key={i}
              onClick={() => goDetail(u.id)}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div>{u.type}</div>
              <div>{u.name}</div>
              <div>{u.id}</div>
              <div>{u.email}</div>
              <div>{u.tel}</div>
              <div>{u.date}</div>
            </dl>
          ))
        )}
      </div>
      {totalPage > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {Array.from({ length: totalPage }, (_, idx) => (
            <Button
              key={idx}
              variant={page === idx + 1 ? "contained" : "outlined"}
              sx={{
                minWidth: 40,
                fontWeight: page === idx + 1 ? 700 : 500,
                fontSize: 15,
                mx: 0.5,
                background: page === idx + 1 ? "#1976d2" : undefined,
                color: page === idx + 1 ? "#fff" : "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  background: page === idx + 1 ? "#1565c0" : "#e3f2fd",
                  color: page === idx + 1 ? "#fff" : "#1976d2",
                  borderColor: "#1976d2",
                },
              }}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

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
  border: 1.5px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
`
const selectStyle = css`
  margin-left: 8px;
  padding: 7px 12px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
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
  transition: background 0.15s;
  > div {
    flex: 1;
    padding: 13px 8px;
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
