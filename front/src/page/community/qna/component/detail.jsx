import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { communityGetQnaDetail, communityReplyQna, communityDeleteQna } from "@/api/community"
import Button from "@mui/material/Button"

export default function QnaDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [detail, setDetail] = useState(null)
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser)
  const isAdmin = user.info?.userTpcd === "2"
  const isWriter = detail && user.info?.userId === detail.userId

  useEffect(() => {
    setLoading(true)
    communityGetQnaDetail(id)
      .then((res) => {
        setDetail(res.data)
        setAnswer(res.data?.reply || "")
        setLoading(false)
      })
      .catch(() => {
        setDetail(null)
        setLoading(false)
      })
  }, [id])

  const handleSaveAnswer = () => {
    setLoading(true)
    communityReplyQna({ qnaCode: id, reply: answer })
      .then(() => {
        setDetail({ ...detail, reply: answer })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setLoading(true)
      communityDeleteQna({ qnaCode: id })
        .then(() => {
          setLoading(false)
          navigate("/community/qna")
        })
        .catch(() => setLoading(false))
    }
  }

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
        <dt
          style={{
            fontWeight: 700,
            background: "#f0f0f0",
            border: "1px solid #e0e0e0",
            padding: "12px 8px",
            gridColumn: "1/2",
          }}
        >
          구분
        </dt>
        <dd
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 8px",
            gridColumn: "2/3",
          }}
        >
          {detail.reply ? "답변완료" : "답변대기"}
        </dd>
        <dt
          style={{
            fontWeight: 700,
            background: "#f0f0f0",
            border: "1px solid #e0e0e0",
            padding: "12px 8px",
            gridColumn: "3/4",
          }}
        >
          작성자
        </dt>
        <dd
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 8px",
            gridColumn: "4/5",
          }}
        >
          {detail.userId}
        </dd>
        <dt
          style={{
            fontWeight: 700,
            background: "#f0f0f0",
            border: "1px solid #e0e0e0",
            padding: "12px 8px",
            gridColumn: "1/2",
          }}
        >
          작성일자
        </dt>
        <dd
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 8px",
            gridColumn: "2/3",
          }}
        >
          {detail.writeDate}
        </dd>
        <dt
          style={{
            fontWeight: 700,
            background: "#f0f0f0",
            border: "1px solid #e0e0e0",
            padding: "12px 8px",
            gridColumn: "3/4",
          }}
        >
          제목
        </dt>
        <dd
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 8px",
            gridColumn: "4/5",
          }}
        >
          {detail.title}
        </dd>
        <dt
          style={{
            fontWeight: 700,
            background: "#f0f0f0",
            border: "1px solid #e0e0e0",
            padding: "12px 8px",
            gridColumn: "1/2",
          }}
        >
          내용
        </dt>
        <dd
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            padding: "10px 8px",
            gridColumn: "2/5",
            minHeight: 120,
            verticalAlign: "top",
          }}
        >
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
            <Button
              variant="contained"
              sx={{ fontWeight: 600, mr: 1 }}
              onClick={handleSaveAnswer}
              disabled={loading}
            >
              답변 저장
            </Button>
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
            {detail.reply || "아직 답변이 등록되지 않았습니다."}
          </div>
        )}
      </div>
      <div style={{ marginTop: 40, textAlign: "right" }}>
        <Button
          variant="outlined"
          sx={{
            minWidth: 90,
            fontWeight: 600,
            fontSize: 15,
            mr: 1,
            color: "#1976d2",
            borderColor: "#1976d2",
            "&:hover": {
              borderColor: "#1565c0",
              color: "#1565c0",
              background: "#e3f2fd",
            },
          }}
          onClick={() => navigate("/community/qna")}
          disabled={loading}
        >
          목록
        </Button>
        {(isAdmin || isWriter) && (
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
              onClick={() => navigate(`/community/qna/${id}/edit`)}
              disabled={loading}
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
                  background: "#b71c1c",
                },
              }}
              onClick={handleDelete}
              disabled={loading}
            >
              삭제
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
