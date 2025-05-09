import { css } from "@emotion/react"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function QnaList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/qna")
      .then((res) => res.json())
      .then((data) => {
        setList(data)
        setFiltered(data)
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
        (item) => item.title.includes(search.title) && item.writer.includes(search.writer),
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
            css={inputStyle}
          />
        </label>
        <label style={{ fontWeight: 500 }}>
          작성자:
          <input
            type="text"
            value={search.writer}
            onChange={(e) => setSearch({ ...search, writer: e.target.value })}
            css={inputStyle}
          />
        </label>
        <button onClick={handleSearch} css={btnSearch}>
          검색
        </button>
      </div>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button onClick={() => navigate("/community/qna/write")} css={btnWrite}>
          작성
        </button>
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
                <tr key={item.id}>
                  <td css={tdStyle}>{item.status}</td>
                  <td css={tdStyle}>{item.writer}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#0078d4",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate(`/community/qna/${item.id}`)}
                  >
                    {item.title}
                  </td>
                  <td css={tdStyle}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 4px",
                  padding: "4px 10px",
                  border: "1px solid #ccc",
                  background: currentPage === i + 1 ? "#0078d4" : "#fff",
                  color: currentPage === i + 1 ? "#fff" : "#333",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: currentPage === i + 1 ? 700 : 400,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const thStyle = css`
  border: "1px solid #e0e0e0",
  padding: "12px 8px",
  background: "#f0f0f0",
  fontWeight: 700,`
const tdStyle = css`
  border: "1px solid #e0e0e0",
  padding: "10px 8px",
  background: "#fff",`
const inputStyle = css`
  marginLeft: 8,
  padding: "6px 10px",
  border: "1px solid #ccc",
  borderRadius: 4,
  background: "#fff",`
const btnSearch = css`
  padding: "7px 20px";
  border: none;
  border-radius: 4px;
  background: #0078d4;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`
const btnWrite = css`
  padding: "7px 20px";
  border: none;
  border-radius: 4px;
  background: #28a745;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`
const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`
