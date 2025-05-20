import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { communityGetNoticeDetail, communityDeleteNotice } from "@/api/community"

export default function NoticeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const user = useSelector(selectUser)
  const isAdmin = user.info?.userTpcd === "2"

  useEffect(() => {
    setLoading(true)
    communityGetNoticeDetail(id)
      .then((res) => {
        setData(res.data ? res.data : res)
        setLoading(false)
      })
      .catch(() => {
        setData(null)
        setLoading(false)
      })
  }, [id])

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setDeleting(true)
      communityDeleteNotice({ noticeCode: id })
        .then(() => {
          setDeleting(false)
          navigate("/community/notice")
        })
        .catch(() => setDeleting(false))
    }
  }

  if (loading) return null
  if (!data) return <div css={emptyStyle}>존재하지 않는 공지입니다.</div>

  return (
    <div css={wrapStyle}>
      <h1 css={titleStyle}>공지사항 상세</h1>
      <div css={cardStyle}>
        <dl css={dlStyle}>
          <dt css={thStyle}>구분</dt>
          <dd css={tdStyle}>{data.type}</dd>
          <dt css={thStyle}>작성자</dt>
          <dd css={tdStyle}>{data.writer}</dd>
          <dt css={thStyle}>작성일자</dt>
          <dd css={tdStyle}>{data.writeDate}</dd>
          <dt css={thStyle}>제목</dt>
          <dd css={tdStyle}>{data.title}</dd>
          <dt css={thStyle} style={{ gridColumn: "1/2" }}>
            내용
          </dt>
          <dd css={contentTdStyle} style={{ gridColumn: "2/5" }}>
            {data.content}
          </dd>
        </dl>
        <div css={btnAreaStyle}>
          <button css={btnStyle} onClick={() => navigate(-1)}>
            목록
          </button>
          {isAdmin && (
            <>
              <button
                css={[btnStyle, btnGray]}
                style={{ marginLeft: 8 }}
                onClick={() => navigate(`/community/notice/${id}/edit`)}
                disabled={deleting}
              >
                수정
              </button>
              <button
                css={[btnStyle, btnRed]}
                style={{ marginLeft: 8 }}
                onClick={handleDelete}
                disabled={deleting}
              >
                삭제
              </button>
            </>
          )}
        </div>
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
const cardStyle = css`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 32px 24px 28px 24px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`
const dlStyle = css`
  display: grid;
  grid-template-columns: 120px 1fr 120px 1fr;
  row-gap: 16px;
  column-gap: 0;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
`
const thStyle = css`
  border: 1px solid #e0e0e0;
  padding: 12px 8px;
  background: #f0f0f0;
  font-weight: 700;
  font-size: 1rem;
  text-align: left;
`
const tdStyle = css`
  border: 1px solid #e0e0e0;
  padding: 10px 8px;
  background: #fff;
  font-size: 1rem;
  vertical-align: middle;
`
const contentTdStyle = css`
  border: 1px solid #e0e0e0;
  padding: 18px 12px;
  background: #fff;
  font-size: 1.08rem;
  min-height: 120px;
  white-space: pre-line;
`
const btnAreaStyle = css`
  text-align: right;
  margin-top: 16px;
`
const btnStyle = css`
  padding: 8px 24px;
  background: #fff;
  color: #222;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border 0.15s;
  &:hover {
    background: #0078d4;
    color: #fff;
    border: 1.5px solid #0078d4;
  }
`
const btnGray = css`
  background: #6c757d !important;
  color: #fff !important;
  border: none;
  &:hover {
    background: #495057 !important;
  }
`
const btnRed = css`
  background: #dc3545 !important;
  color: #fff !important;
  border: none;
  &:hover {
    background: #b52a37 !important;
  }
`
const emptyStyle = css`
  padding: 80px 0;
  text-align: center;
  color: #888;
  font-size: 1.2rem;
`
