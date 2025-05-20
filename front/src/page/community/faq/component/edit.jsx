import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { communityGetFaqDetail, communityEditFaq, communityDeleteFaq } from "@/api/community"

export default function FaqEdit() {
  const navigate = useNavigate()
  const { faqCode } = useParams()
  const isEdit = !!faqCode

  const [form, setForm] = useState({ question: "", answer: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      communityGetFaqDetail(faqCode)
        .then((res) => {
          const data = res.data || res
          setForm({ question: data.question || "", answer: data.answer || "" })
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [faqCode, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.question.trim() || !form.answer.trim()) {
      alert("질문과 답변을 모두 입력하세요.")
      return
    }
    setLoading(true)
    await communityEditFaq({ ...form, faqCode })
    setLoading(false)
    navigate("/community/faq")
  }

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    setLoading(true)
    await communityDeleteFaq({ faqCode })
    setLoading(false)
    navigate("/community/faq")
  }

  return (
    <div css={wrapStyle}>
      <h1 css={titleStyle}>{isEdit ? "FAQ 수정" : "FAQ 작성"}</h1>
      <form css={formStyle} onSubmit={handleSubmit}>
        <label css={labelStyle}>
          질문
          <input
            css={inputStyle}
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="질문을 입력하세요"
            disabled={loading}
          />
        </label>
        <label css={labelStyle}>
          답변
          <textarea
            css={textareaStyle}
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="답변을 입력하세요"
            disabled={loading}
          />
        </label>
        <div css={btnAreaStyle}>
          <button type="button" css={btnGray} onClick={() => navigate(-1)} disabled={loading}>
            취소
          </button>
          {isEdit && (
            <button
              type="button"
              css={btnRed}
              onClick={handleDelete}
              disabled={loading}
              style={{ marginRight: 8 }}
            >
              삭제
            </button>
          )}
          <button type="submit" css={btnGreen} disabled={loading}>
            저장
          </button>
        </div>
      </form>
    </div>
  )
}

const wrapStyle = css`
  padding: 40px;
  background: #f9f9f9;
  min-height: 100vh;
`
const titleStyle = css`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 28px;
  color: #222;
`
const formStyle = css`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 32px 24px 28px 24px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const labelStyle = css`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const inputStyle = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`
const textareaStyle = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
`
const btnAreaStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`
const btnGray = css`
  padding: 8px 24px;
  background: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #495057;
  }
`
const btnGreen = css`
  padding: 8px 24px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #218838;
  }
`
const btnRed = css`
  padding: 8px 24px;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #b52a37;
  }
`
