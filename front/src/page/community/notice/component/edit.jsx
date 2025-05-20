import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { css } from "@emotion/react"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { communityGetNoticeDetail, communityEditNotice } from "@/api/community"

export default function NoticeEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useSelector(selectUser)
  const isEdit = !!id
  const isAdmin = user.info?.userTpcd === "2"

  const [form, setForm] = useState({
    type: "",
    title: "",
    content: "",
    writeDate: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      alert("관리자만 접근 가능합니다.")
      navigate("/community/notice")
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      communityGetNoticeDetail(id)
        .then((res) => {
          const data = res.data || res
          setForm({
            type: data.type || "",
            title: data.title || "",
            content: data.content || "",
            writeDate: data.writeDate || "",
          })
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleListClick = () => {
    const hasValue = form.title.trim() || form.content.trim()
    if (hasValue) {
      if (window.confirm("작성 중인 내용이 있습니다. 정말 목록으로 이동하시겠습니까?")) {
        navigate("/community/notice")
      }
    } else {
      navigate("/community/notice")
    }
  }

  const handleSubmit = () => {
    if (!form.type.trim() || !form.title.trim() || !form.content.trim()) {
      alert("구분, 제목, 내용을 입력하세요.")
      return
    }
    setLoading(true)
    communityEditNotice({
      ...(isEdit ? { noticeCode: id } : {}),
      type: form.type,
      title: form.title,
      content: form.content,
      writer: user.info?.userId,
    })
      .then(() => {
        setLoading(false)
        navigate("/community/notice")
      })
      .catch(() => setLoading(false))
  }

  return (
    <div css={wrapStyle}>
      <h1 css={titleStyle}>{isEdit ? "공지사항 수정" : "공지사항 작성"}</h1>
      <dl css={dlStyle}>
        <dt css={thStyle}>구분</dt>
        <dd css={tdStyle}>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            css={inputStyle}
            disabled={loading}
          >
            <option value="">선택</option>
            <option value="시스템">시스템</option>
            <option value="이벤트">이벤트</option>
            <option value="기타">기타</option>
          </select>
        </dd>
        <dt css={thStyle}>작성자</dt>
        <dd css={tdStyle}>{user.info?.userId || ""}</dd>
        <dt css={thStyle}>제목</dt>
        <dd css={tdStyle}>
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
        <dt css={thStyle}>작성일자</dt>
        <dd css={tdStyle}>{isEdit ? form.writeDate : new Date().toLocaleString()}</dd>
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
      <div css={btnAreaStyle}>
        <button
          css={btnStyle}
          style={{ marginRight: 8 }}
          onClick={handleListClick}
          disabled={loading}
        >
          목록
        </button>
        <button css={[btnStyle, btnBlue]} onClick={handleSubmit} disabled={loading}>
          {isEdit ? "수정" : "작성"}
        </button>
      </div>
    </div>
  )
}

const wrapStyle = css`
  min-height: 100vh;
  background: #f9f9f9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const titleStyle = css`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: #222;
  letter-spacing: -1px;
  align-self: flex-start;
`
const dlStyle = css`
  display: grid;
  grid-template-columns: 120px 1fr 120px 1fr;
  row-gap: 16px;
  column-gap: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 24px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 900px;
`
const thStyle = css`
  border: 1px solid #e0e0e0;
  padding: 12px 8px;
  background: #f0f0f0;
  font-weight: 700;
  font-size: 1rem;
`
const tdStyle = css`
  border: 1px solid #e0e0e0;
  padding: 10px 8px;
  background: #fff;
  font-size: 1rem;
`
const inputStyle = css`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`
const textareaStyle = css`
  width: 100%;
  box-sizing: border-box;
  min-height: 180px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  resize: vertical;
`
const btnAreaStyle = css`
  text-align: right;
  margin-top: 40px;
  max-width: 900px;
  width: 100%;
`
const btnStyle = css`
  padding: 8px 24px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition:
    background 0.15s,
    color 0.15s,
    border 0.15s;
`
const btnBlue = css`
  background: #0078d4 !important;
  color: #fff !important;
  border: none;
  &:hover {
    background: #005fa3 !important;
  }
`
