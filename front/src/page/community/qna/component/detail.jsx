import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { css } from "@emotion/react"

export default function QnaDetail({
  detail,
  answer,
  setAnswer,
  loading,
  handleSaveAnswer,
  handleDelete,
  isAdmin,
}) {
  const navigate = useNavigate()
  const { id } = useParams()

  if (loading) return <div style={{ padding: 40 }}>로딩중...</div>
  if (!detail) return <div style={{ padding: 40 }}>존재하지 않는 문의입니다.</div>

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 24 }}>1:1 문의 상세</h1>
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
        <dd style={{ ...tdStyle, gridColumn: "2/3" }}>{detail.status}</dd>
        <dt style={{ ...thStyle, gridColumn: "3/4" }}>작성자</dt>
        <dd style={{ ...tdStyle, gridColumn: "4/5" }}>{detail.writer}</dd>

        <dt style={{ ...thStyle, gridColumn: "1/2" }}>작성일자</dt>
        <dd style={{ ...tdStyle, gridColumn: "2/3" }}>{detail.date}</dd>
        <dt style={{ ...thStyle, gridColumn: "3/4" }}>제목</dt>
        <dd style={{ ...tdStyle, gridColumn: "4/5" }}>{detail.title}</dd>

        <dt style={{ ...thStyle, gridColumn: "1/2" }}>내용</dt>
        <dd style={{ ...tdStyle, gridColumn: "2/5", minHeight: 120, verticalAlign: "top" }}>
          {detail.content}
        </dd>
      </dl>
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
        <button onClick={() => navigate("/community/qna")} css={btnStyle} disabled={loading}>
          목록
        </button>
        {isAdmin && (
          <>
            <button
              style={{ ...btnStyle, background: "#6c757d", color: "#fff", marginLeft: 8 }}
              onClick={() => navigate(`/community/qna/${id}/edit`)}
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

const thStyle = css`
  border: "1px solid #e0e0e0",
  padding: "12px 8px",
  background: "#f0f0f0",
  fontWeight: 700,
  `
const tdStyle = css`
  border: "1px solid #e0e0e0",
  padding: "10px 8px",
  background: "#fff",
  `
const btnStyle = css`
  padding: "8px 24px",
  background: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: 600,
  `
