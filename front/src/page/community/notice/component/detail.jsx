import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { communityGetNoticeDetail, communityDeleteNotice } from "@/api/community"
import Button from "@mui/material/Button"
import { css } from "@emotion/react"
import { useModal } from "@/component/modalProvider"

export default function NoticeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const user = useSelector(selectUser)
  const isAdmin = user.info?.userTpcd === "2"
  const { openModal, closeModal, showAlert } = useModal()

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
    openModal({
      title: "삭제 확인",
      content: "정말 삭제하시겠습니까?",
      type: "confirm",
      fn: async () => {
        closeModal()
        setDeleting(true)
        try {
          await communityDeleteNotice({ noticeCode: id })
          showAlert({ message: "삭제되었습니다.", type: "success" })
          navigate("/community/notice")
        } catch {
          showAlert({ message: "삭제에 실패했습니다.", type: "error" })
        } finally {
          setDeleting(false)
        }
      },
    })
  }

  if (loading) return null
  if (!data)
    return (
      <div style={{ padding: 80, textAlign: "center", color: "#888", fontSize: "1.2rem" }}>
        존재하지 않는 공지입니다.
      </div>
    )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: 32,
          color: "#222",
          letterSpacing: "-1px",
          alignSelf: "flex-start",
        }}
      >
        공지사항 상세
      </h1>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.07)",
          padding: "32px 24px 28px 24px",
          maxWidth: 900,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <dl css={dlStyle}>
          <dt css={thStyle}>구분</dt>
          <dd css={tdStyle}>{data.type}</dd>
          <dt css={thStyle}>작성자</dt>
          <dd css={tdStyle}>{data.writer}</dd>
          <dt css={thStyle}>작성일자</dt>
          <dd css={tdStyle}>{data.writeDate}</dd>
          <dt css={thStyle}>제목</dt>
          <dd css={tdStyle}>{data.title}</dd>
          <dt css={thStyle}>내용</dt>
          <dd
            css={[
              contentTdStyle,
              css`
                grid-column: 2/5;
              `,
            ]}
          >
            {data.content}
          </dd>
        </dl>
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button
            variant="outlined"
            sx={{ minWidth: 90, fontWeight: 600, fontSize: 15, mr: 1 }}
            onClick={() => navigate(-1)}
            disabled={deleting}
          >
            목록
          </Button>
          {isAdmin && (
            <>
              <Button
                variant="contained"
                sx={{
                  minWidth: 90,
                  fontWeight: 600,
                  fontSize: 15,
                  mr: 1,
                  background: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    background: "#1565c0",
                  },
                }}
                onClick={() => navigate(`/community/notice/${id}/edit`)}
                disabled={deleting}
              >
                수정
              </Button>
              <Button
                variant="contained"
                sx={{
                  minWidth: 90,
                  fontWeight: 600,
                  fontSize: 15,
                  ml: 1,
                  background: "#dc3545",
                  color: "#fff",
                  "&:hover": {
                    background: "#b52a37",
                  },
                }}
                onClick={handleDelete}
                disabled={deleting}
              >
                삭제
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

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
