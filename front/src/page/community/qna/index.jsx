import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

// 관리자 여부 예시 (실제 서비스에서는 로그인 정보에서 받아와야 함)
function getIsAdmin() {
  // 예시: localStorage, context, API 등에서 가져올 수 있음
  // return localStorage.getItem("role") === "admin"
  return true // 테스트용
}

/** @type {import("react").CSSProperties} */
const thStyle = {
  border: "1px solid #e0e0e0",
  padding: "12px 8px",
  background: "#f0f0f0",
  fontWeight: 700,
}
/** @type {import("react").CSSProperties} */
const tdStyle = { border: "1px solid #e0e0e0", padding: "10px 8px", background: "#fff" }
/** @type {import("react").CSSProperties} */
const inputStyle = {
  marginLeft: 8,
  padding: "6px 10px",
  border: "1px solid #ccc",
  borderRadius: 4,
  background: "#fff",
}
/** @type {import("react").CSSProperties} */
const btnSearch = {
  padding: "7px 20px",
  border: "none",
  borderRadius: 4,
  background: "#0078d4",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
}
/** @type {import("react").CSSProperties} */
const btnWrite = {
  padding: "7px 20px",
  border: "none",
  borderRadius: 4,
  background: "#28a745",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
}
/** @type {import("react").CSSProperties} */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
}
/** @type {import("react").CSSProperties} */
const btnStyle = {
  padding: "8px 24px",
  background: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: 600,
}

export default function Qna() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isAdmin = getIsAdmin()

  // 목록 상태
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 상세 상태
  const [detail, setDetail] = useState(null)
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  // 목록 데이터 불러오기
  useEffect(() => {
    if (!id) {
      setLoading(true)
      fetch("/api/qna") // 실제 API 주소로 교체
        .then((res) => res.json())
        .then((data) => {
          setList(data)
          setFiltered(data)
          setLoading(false)
        })
        .catch(() => {
          // 에러 시 더미 데이터 사용
          setList([
            {
              id: 1,
              status: "답변대기",
              writer: "작성자1",
              title: "질문1",
              date: "2025-05-01",
              content: "문의 내용1",
              answer: "",
            },
            {
              id: 2,
              status: "답변완료",
              writer: "작성자2",
              title: "질문2",
              date: "2025-05-02",
              content: "문의 내용2",
              answer: "답변 내용2",
            },
          ])
          setFiltered([
            {
              id: 1,
              status: "답변대기",
              writer: "작성자1",
              title: "질문1",
              date: "2025-05-01",
              content: "문의 내용1",
              answer: "",
            },
            {
              id: 2,
              status: "답변완료",
              writer: "작성자2",
              title: "질문2",
              date: "2025-05-02",
              content: "문의 내용2",
              answer: "답변 내용2",
            },
          ])
          setLoading(false)
        })
    }
  }, [id])

  // 상세 데이터 불러오기
  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/qna/${id}`) // 실제 API 주소로 교체
        .then((res) => res.json())
        .then((data) => {
          setDetail(data)
          setAnswer(data.answer || "")
          setLoading(false)
        })
        .catch(() => {
          // 에러 시 더미 데이터 사용
          const dummy = [
            {
              id: 1,
              status: "답변대기",
              writer: "작성자1",
              title: "질문1",
              date: "2025-05-01",
              content: "문의 내용1",
              answer: "",
            },
            {
              id: 2,
              status: "답변완료",
              writer: "작성자2",
              title: "질문2",
              date: "2025-05-02",
              content: "문의 내용2",
              answer: "답변 내용2",
            },
          ]
          const q = dummy.find((item) => String(item.id) === String(id))
          setDetail(q || null)
          setAnswer(q?.answer || "")
          setLoading(false)
        })
    }
  }, [id])

  // 상세/목록 전환 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // 검색
  const handleSearch = () => {
    setFiltered(
      list.filter(
        (item) => item.title.includes(search.title) && item.writer.includes(search.writer),
      ),
    )
    setCurrentPage(1)
  }

  // 답변 저장
  const handleSaveAnswer = () => {
    setLoading(true)
    fetch(`/api/qna/${id}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    })
      .then((res) => (res.ok ? alert("답변이 저장되었습니다.") : alert("저장 실패")))
      .catch(() => alert("저장 실패(더미)"))
      .finally(() => setLoading(false))
  }

  // 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    setLoading(true)
    fetch(`/api/qna/${id}`, { method: "DELETE" })
      .then((res) => (res.ok ? alert("삭제되었습니다.") : alert("삭제 실패")))
      .catch(() => alert("삭제되었습니다.(더미)"))
      .finally(() => {
        setLoading(false)
        navigate("/community/qna")
      })
  }

  // 상세 화면
  if (id) {
    if (loading) return <div style={{ padding: 40 }}>로딩중...</div>
    if (!detail) return <div style={{ padding: 40 }}>존재하지 않는 문의입니다.</div>
    return (
      <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
        <h1 style={{ marginBottom: 24 }}>1:1 문의 상세</h1>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>구분</th>
              <td style={tdStyle}>{detail.status}</td>
              <th style={thStyle}>작성자</th>
              <td style={tdStyle}>{detail.writer}</td>
            </tr>
            <tr>
              <th style={thStyle}>작성일자</th>
              <td style={tdStyle}>{detail.date}</td>
              <th style={thStyle}>제목</th>
              <td style={tdStyle}>{detail.title}</td>
            </tr>
            <tr>
              <th style={thStyle}>내용</th>
              <td colSpan={3} style={{ ...tdStyle, height: 120, verticalAlign: "top" }}>
                {detail.content}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 12 }}>답변</h2>
          {isAdmin ? (
            <div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 80,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: 8,
                  fontSize: 15,
                }}
                placeholder="답변을 입력하세요"
                disabled={loading}
              />
              <button
                style={{ ...btnStyle, background: "#0078d4", color: "#fff", marginRight: 8 }}
                onClick={handleSaveAnswer}
                disabled={loading}
              >
                답변 저장
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: 12,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 4,
                minHeight: 60,
              }}
            >
              {detail.answer || "아직 답변이 등록되지 않았습니다."}
            </div>
          )}
        </div>
        <div style={{ marginTop: 40, textAlign: "right" }}>
          <button onClick={() => navigate("/community/qna")} style={btnStyle} disabled={loading}>
            목록
          </button>
          {isAdmin && (
            <>
              <button
                style={{ ...btnStyle, background: "#6c757d", color: "#fff", marginLeft: 8 }}
                onClick={() => alert("수정 기능은 실제 구현 필요")}
                disabled={loading}
              >
                수정
              </button>
              <button
                style={{ ...btnStyle, background: "#dc3545", color: "#fff", marginLeft: 8 }}
                onClick={handleDelete}
                disabled={loading}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // 목록 화면
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
            style={inputStyle}
          />
        </label>
        <label style={{ fontWeight: 500 }}>
          작성자:
          <input
            type="text"
            value={search.writer}
            onChange={(e) => setSearch({ ...search, writer: e.target.value })}
            style={inputStyle}
          />
        </label>
        <button onClick={handleSearch} style={btnSearch}>
          검색
        </button>
      </div>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button onClick={() => navigate("/community/qna")} style={btnWrite}>
          작성
        </button>
      </div>
      {loading ? (
        <div style={{ padding: 40 }}>로딩중...</div>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>구분</th>
                <th style={thStyle}>작성자</th>
                <th style={thStyle}>제목</th>
                <th style={thStyle}>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.status}</td>
                  <td style={tdStyle}>{item.writer}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#0078d4",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      // 상세 이동 시 상태 초기화
                      setDetail(null)
                      setAnswer("")
                      navigate(`/community/qna/${item.id}`)
                    }}
                  >
                    {item.title}
                  </td>
                  <td style={tdStyle}>{item.date}</td>
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
