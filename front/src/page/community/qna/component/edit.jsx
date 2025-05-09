import React, { useState, useEffect } from "react"
import { css } from "@emotion/react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

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
const btnStyle = css`
  padding: "8px 24px",
  background: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: 600,`

function getUserName() {
  return ""
}

export default function QnaEdit({ detail }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const isEdit = location.pathname.endsWith("/edit")
  const userName = getUserName()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: userName,
    date: "",
  })

  useEffect(() => {
    if (isEdit && detail) {
      setForm({
        title: detail.title,
        content: detail.content,
        writer: detail.writer,
        date: detail.date,
      })
    }
  }, [isEdit, detail])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      alert("제목과 내용을 입력하세요.")
      return
    }
    setLoading(true)
    const method = isEdit ? "PUT" : "POST"
    const url = isEdit ? `/api/qna/${id}` : "/api/qna"
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert(isEdit ? "수정되었습니다." : "작성되었습니다.")
          navigate("/community/qna")
        } else {
          alert("저장 실패")
        }
      })
      .catch(() => alert("저장 실패"))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 24 }}>1:1 문의 {isEdit ? "수정" : "작성"}</h1>
      <form onSubmit={handleSubmit}>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 120px 1fr",
            rowGap: 16,
            columnGap: 0,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            padding: 24,
          }}
        >
          <dt style={{ ...thStyle, gridColumn: "1/2" }}>구분</dt>
          <dd style={{ ...tdStyle, gridColumn: "2/3" }}>답변대기</dd>
          <dt style={{ ...thStyle, gridColumn: "3/4" }}>작성자</dt>
          <dd style={{ ...tdStyle, gridColumn: "4/5" }}>{userName}</dd>

          <dt style={{ ...thStyle, gridColumn: "1/2" }}>제목</dt>
          <dd style={{ ...tdStyle, gridColumn: "2/5" }}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ ...inputStyle, width: "90%" }}
              maxLength={100}
              disabled={loading}
            />
          </dd>

          <dt style={{ ...thStyle, gridColumn: "1/2" }}>작성일자</dt>
          <dd style={{ ...tdStyle, gridColumn: "2/5" }}>
            {isEdit ? form.date : new Date().toISOString().slice(0, 16).replace("T", " ")}
          </dd>

          <dt style={{ ...thStyle, gridColumn: "1/2" }}>내용</dt>
          <dd style={{ ...tdStyle, gridColumn: "2/5" }}>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{
                width: "100%",
                minHeight: 160,
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 8,
                fontSize: 15,
              }}
              maxLength={3000}
              disabled={loading}
            />
            <div style={{ textAlign: "right", fontSize: 13, color: "#888" }}>
              {form.content.length}/3000
            </div>
          </dd>
        </dl>
        <div style={{ marginTop: 32, textAlign: "right" }}>
          <button
            type="button"
            css={btnStyle}
            onClick={() => navigate("/community/qna")}
            disabled={loading}
          >
            목록
          </button>
          <button
            type="button"
            style={{ ...btnStyle, marginLeft: 8 }}
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            style={{ ...btnStyle, background: "#0078d4", color: "#fff", marginLeft: 8 }}
            disabled={loading}
          >
            {isEdit ? "수정" : "작성"}
          </button>
        </div>
      </form>
    </div>
  )
}
