import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { css } from "@emotion/react"
import { communityGetQnaDetail, communityEditQna } from "@/api/community"

export default function QnaEdit() {
  const navigate = useNavigate()
  const { id } = useParams() // id가 있으면 수정, 없으면 작성
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const isEdit = !!id

  const [form, setForm] = useState({
    title: "",
    content: "",
  })
  const [loading, setLoading] = useState(false)

  // 수정일 때 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      communityGetQnaDetail(id)
        .then((res) => {
          setForm({
            title: res.data.title,
            content: res.data.content,
          })
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("제목과 내용을 입력하세요.")
      return
    }
    setLoading(true)
    communityEditQna({
      ...(isEdit ? { qnaCode: id } : {}),
      title: form.title,
      content: form.content,
      userId: user.userId,
    })
      .then(() => {
        setLoading(false)
        navigate("/community/qna")
      })
      .catch(() => setLoading(false))
  }

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 24 }}>{isEdit ? "1:1 문의 수정" : "1:1 문의 작성"}</h1>
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
        <dt css={thStyle} style={{ gridColumn: "1/2" }}>
          구분
        </dt>
        <dd css={tdStyle} style={{ gridColumn: "2/3" }}>
          답변대기
        </dd>
        <dt css={thStyle} style={{ gridColumn: "3/4" }}>
          작성자
        </dt>
        <dd css={tdStyle} style={{ gridColumn: "4/5" }}>
          {user.userId}
        </dd>
        <dt css={thStyle} style={{ gridColumn: "1/2" }}>
          제목
        </dt>
        <dd css={tdStyle} style={{ gridColumn: "2/5" }}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            css={inputStyle}
            maxLength={100}
            disabled={loading}
            placeholder="제목을 입력하세요"
          />
        </dd>
        <dt css={thStyle} style={{ gridColumn: "1/2" }}>
          내용
        </dt>
        <dd css={tdStyle} style={{ gridColumn: "2/5" }}>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            css={textareaStyle}
            maxLength={3000}
            disabled={loading}
            placeholder="내용을 입력하세요"
          />
          <div style={{ textAlign: "right", fontSize: 13, color: "#888" }}>
            {form.content.length}/3000자
          </div>
        </dd>
      </dl>
      <div style={{ marginTop: 40, textAlign: "right" }}>
        <button
          css={btnStyle}
          style={{ marginRight: 8 }}
          onClick={() => navigate("/community/qna")}
          disabled={loading}
        >
          목록
        </button>
        <button
          css={btnStyle}
          style={{ background: "#6c757d", color: "#fff", marginRight: 8 }}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          취소
        </button>
        <button
          css={btnStyle}
          style={{ background: "#0078d4", color: "#fff" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {isEdit ? "수정" : "작성"}
        </button>
      </div>
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
const inputStyle = css`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`
const textareaStyle = css`
  width: 100%;
  min-height: 180px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  resize: vertical;
`
const btnStyle = css`
  padding: 8px 24px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
`
