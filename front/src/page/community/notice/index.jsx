import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { communityGetNoticeList } from "@/api/community"
import Button from "@mui/material/Button"
import { css } from "@emotion/react"

export default function NoticeList() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAdmin = user.info?.userTpcd === "2"
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    communityGetNoticeList()
      .then((res) => {
        const arr = Array.isArray(res) ? res : Array.isArray(res.data) ? res.data : []
        setList(arr)
        setFiltered(arr)
        setLoading(false)
      })
      .catch(() => {
        setList([])
        setFiltered([])
        setLoading(false)
      })
  }, [])

  const handleSearch = () => {
    setFiltered(
      list.filter(
        (item) =>
          (item.title || "").includes(search.title) &&
          (item.writer || item.userid || item.userId || "").includes(search.writer),
      ),
    )
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paged = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 28 }}>공지사항</h1>
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
        {isAdmin && (
          <Button
            variant="contained"
            sx={{
              minWidth: 90,
              fontWeight: 600,
              fontSize: 15,
              height: 40,
            }}
            onClick={() => navigate("/community/notice/write")}
          >
            작성
          </Button>
        )}
      </div>
      <div style={{ marginBottom: 10, color: "#888", fontWeight: 500 }}>
        총 {filtered.length.toLocaleString()} 개
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
                  key={
                    item.noticeCode ||
                    item.noticecode ||
                    item.qnaCode ||
                    item.title + (item.writeDate || item.writedate || item.date)
                  }
                  css={rowStyle}
                  onClick={() =>
                    navigate(
                      `/community/notice/${
                        item.noticeCode || item.noticecode || item.qnaCode || item.title
                      }`,
                    )
                  }
                  tabIndex={0}
                >
                  <td css={tdStyle}>{item.type || item.category}</td>
                  <td css={tdStyle}>{item.writer || item.userid || item.userId}</td>
                  <td css={tdStyle}>{item.title}</td>
                  <td css={tdStyle}>{item.writeDate || item.writedate || item.date}</td>
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
