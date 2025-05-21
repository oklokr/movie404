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

  // 작성된 내용이 있을 때 확인 후 이동
  const handleLeave = (callback) => {
    if (form.question.trim() || form.answer.trim()) {
      if (window.confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
        callback()
      }
    } else {
      callback()
    }
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
    handleLeave(async () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) return
      setLoading(true)
      await communityDeleteFaq({ faqCode })
      setLoading(false)
      navigate("/community/faq")
    })
  }

  const handleCancel = () => {
    handleLeave(() => navigate(-1))
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
          <button type="button" css={btnOutlined} onClick={handleCancel} disabled={loading}>
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
          <button type="submit" css={btnContained} disabled={loading}>
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
const btnContained = css`
  padding: 8px 24px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  min-width: 90px;
  &:hover {
    background: #1565c0;
  }
`
const btnOutlined = css`
  padding: 8px 24px;
  background: #fff;
  color: #1976d2;
  border: 2px solid #1976d2;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  min-width: 90px;
  &:hover {
    background: #e6f2ff;
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
  min-width: 90px;
  &:hover {
    background: #b52a37;
  }
`
