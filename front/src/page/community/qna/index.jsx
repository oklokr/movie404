import { css } from "@emotion/react"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/store/selectors"
import { commonGetUserInfo } from "@/api/common"
import { setUserInfo } from "@/store/slices/user"
import { communityGetQnaList } from "@/api/community"
import Button from "@mui/material/Button"

export default function QnaList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [loading, setLoading] = useState(false)

  // 사용자 정보가 없으면 불러오기
  useEffect(() => {
    if (!user.info?.userId) return
    setLoading(true)
    let params = {
      userId: user.info.userId,
      isAdmin: user.info.userTpcd === "2",
    }
    communityGetQnaList(params)
      .then((res) => {
        setList(res.data)
        setFiltered(res.data)
        setLoading(false)
      })
      .catch(() => {
        setList([])
        setFiltered([])
        setLoading(false)
      })
  }, [user.info?.userId, user.info?.USER_TPCD])

  const handleSearch = () => {
    setFiltered(
      list.filter(
        (item) =>
          item.title.includes(search.title) &&
          (item.userId?.includes(search.writer) || item.writer?.includes(search.writer)),
      ),
    )
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paged = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 28 }}>1:1 문의</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <label style={{ fontWeight: 500 }}>
          제목:
          <input
            type="text"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            style={{
              marginLeft: 8,
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "#fff",
            }}
          />
        </label>
        <label style={{ fontWeight: 500 }}>
          작성자:
          <input
            type="text"
            value={search.writer}
            onChange={(e) => setSearch({ ...search, writer: e.target.value })}
            style={{
              marginLeft: 8,
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "#fff",
            }}
          />
        </label>
        <Button
          variant="contained"
          sx={{ minWidth: 90, fontWeight: 600, fontSize: 15, height: 40 }}
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <Button
          variant="contained"
          sx={{
            minWidth: 90,
            fontWeight: 600,
            fontSize: 15,
            height: 40,
            background: undefined,
            color: undefined,
            borderColor: undefined,
          }}
          onClick={() => navigate("/community/qna/write")}
        >
          작성
        </Button>
      </div>
      {loading ? (
        <div style={{ padding: 40 }}>로딩중...</div>
      ) : (
        <>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th css={thStyle}>구분</th>
                <th css={thStyle}>작성자</th>
                <th css={thStyle}>제목</th>
                <th css={thStyle}>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((item) => (
                <tr
                  key={item.qnaCode || item.id}
                  css={rowStyle}
                  onClick={() => navigate(`/community/qna/${item.qnaCode || item.id}`)}
                  tabIndex={0}
                >
                  <td css={tdStyle}>{item.reply ? "답변완료" : "답변대기"}</td>
                  <td css={tdStyle}>{item.userId || item.writer}</td>
                  <td css={tdStyle}>{item.title}</td>
                  <td css={tdStyle}>{item.writeDate || item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "contained" : "outlined"}
                sx={{
                  minWidth: 40,
                  fontWeight: currentPage === i + 1 ? 700 : 400,
                  fontSize: 15,
                  mx: 0.5,
                  background: currentPage === i + 1 ? undefined : undefined,
                  color: currentPage === i + 1 ? undefined : undefined,
                  borderColor: currentPage === i + 1 ? undefined : undefined,
                }}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const thStyle = css`
  border: 1px solid #e0e0e0;
  padding: 12px 8px;
  background: #f0f0f0;
  font-weight: 700;
`
const tdStyle = css`
  border: 1px solid #e0e0e0;
  padding: 10px 8px;
  background: #fff;
`
const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`
const rowStyle = css`
  cursor: pointer;
  transition:
    background 0.15s,
    box-shadow 0.15s;
  &:hover {
    background: #e6f2ff;
    box-shadow: 0 2px 8px rgba(0, 120, 212, 0.1);
    outline: 2px solid #0078d4;
    z-index: 1;
    position: relative;
  }
`
