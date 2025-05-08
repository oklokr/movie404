import { useState } from "react"

function Qna() {
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [data] = useState([
    { id: 1, status: "답변대기", writer: "작성자1", title: "질문1", date: "2025-05-01" },
    { id: 2, status: "답변완료", writer: "작성자2", title: "질문2", date: "2025-05-02" },
    { id: 3, status: "답변대기", writer: "작성자3", title: "질문3", date: "2025-05-03" },
    { id: 4, status: "답변완료", writer: "작성자4", title: "질문4", date: "2025-05-04" },
    { id: 5, status: "답변대기", writer: "작성자5", title: "질문5", date: "2025-05-05" },
    { id: 6, status: "답변완료", writer: "작성자6", title: "질문6", date: "2025-05-06" },
    { id: 7, status: "답변대기", writer: "작성자7", title: "질문7", date: "2025-05-07" },
    { id: 8, status: "답변완료", writer: "작성자8", title: "질문8", date: "2025-05-08" },
    { id: 9, status: "답변대기", writer: "작성자9", title: "질문9", date: "2025-05-09" },
    { id: 10, status: "답변완료", writer: "작성자10", title: "질문10", date: "2025-05-10" },
    { id: 11, status: "답변대기", writer: "작성자11", title: "질문11", date: "2025-05-11" },
  ])

  // 검색된 데이터 상태 추가
  const [filtered, setFiltered] = useState(data)

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const pagedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = () => {
    const filteredData = data.filter(
      (item) => item.title.includes(search.title) && item.writer.includes(search.writer),
    )
    setFiltered(filteredData)
    setCurrentPage(1) // 검색 시 1페이지로 이동
  }

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* 왼쪽 카테고리 */}
      <div
        style={{
          width: "220px",
          borderRight: "1px solid #ddd",
          background: "#fff",
          padding: "32px 24px",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "32px", letterSpacing: "-1px" }}>고객센터</h1>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "18px" }}>
            <a
              href="/community/notice"
              style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}
            >
              공지사항
            </a>
          </li>
          <li style={{ marginBottom: "18px" }}>
            <a
              href="/community/qna"
              style={{ textDecoration: "none", color: "#0078d4", fontWeight: 700 }}
            >
              1:1 문의
            </a>
          </li>
          <li style={{ color: "#888" }}>
            <span>자주 묻는 질문</span>
          </li>
        </ul>
      </div>

      {/* 오른쪽 1:1 문의 화면 */}
      <div
        style={{
          flex: 1,
          padding: "40px 48px",
          background: "#f9f9f9",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "28px", fontWeight: 700 }}>1:1 문의</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "18px",
          }}
        >
          <label style={{ fontWeight: 500 }}>
            제목:
            <input
              type="text"
              value={search.title}
              onChange={(e) => setSearch({ ...search, title: e.target.value })}
              style={{
                marginLeft: "8px",
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
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
                marginLeft: "8px",
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#fff",
              }}
            />
          </label>
          <button
            onClick={handleSearch}
            style={{
              padding: "7px 20px",
              border: "none",
              borderRadius: "4px",
              background: "#0078d4",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </div>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button
            style={{
              padding: "7px 20px",
              border: "none",
              borderRadius: "4px",
              background: "#28a745",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            작성
          </button>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>구분</th>
              <th style={thStyle}>작성자</th>
              <th style={thStyle}>제목</th>
              <th style={thStyle}>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.status}</td>
                <td style={tdStyle}>{item.writer}</td>
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
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
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: currentPage === i + 1 ? 700 : 400,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const thStyle = {
  border: "1px solid #e0e0e0",
  padding: "12px 8px",
  background: "#f0f0f0",
  fontWeight: 700,
  fontSize: "15px",
}
const tdStyle = {
  border: "1px solid #e0e0e0",
  padding: "10px 8px",
  fontSize: "15px",
  background: "#fff",
}

export default Qna
