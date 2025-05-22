import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { css } from "@emotion/react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/store/selectors"
import { commonGetUserInfo } from "@/api/common"
import { setUserInfo } from "@/store/slices/user"
import { communityGetQnaDetail, communityEditQna } from "@/api/community"
import Button from "@mui/material/Button"
import { useModal } from "@/component/modalProvider"

export default function QnaEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isEdit = !!id
  const { openModal, closeModal, showAlert } = useModal()

  const [form, setForm] = useState({
    title: "",
    content: "",
  })
  const [loading, setLoading] = useState(false)

  // 사용자 정보가 없으면 불러오기
  useEffect(() => {
    if (!user.info?.userId) {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1]
      if (token) {
        commonGetUserInfo().then((res) => {
          if (res.data?.code === 200) dispatch(setUserInfo(res.data.data))
        })
      }
    }
  }, [dispatch, user.info])

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

  const handleListClick = () => {
    const hasValue = form.title.trim() || form.content.trim()
    if (hasValue) {
      openModal({
        title: "확인",
        content: "작성 중인 내용이 있습니다. 정말 목록으로 이동하시겠습니까?",
        type: "confirm",
        fn: () => {
          closeModal()
          navigate("/community/qna")
        },
      })
    } else {
      navigate("/community/qna")
    }
  }

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) {
      showAlert({ message: "제목과 내용을 입력하세요.", type: "warning" })
      return
    }
    if (!user.info?.userId) {
      showAlert({ message: "로그인 정보가 없습니다. 다시 로그인 해주세요.", type: "warning" })
      return
    }
    setLoading(true)
    communityEditQna({
      ...(isEdit ? { qnaCode: id } : {}),
      title: form.title,
      content: form.content,
      userId: user.info.userId,
    })
      .then(() => {
        setLoading(false)
        showAlert({ message: isEdit ? "수정되었습니다." : "작성되었습니다.", type: "success" })
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
          {user.info?.userId || ""}
        </dd>
        <dt css={thStyle} style={{ gridColumn: "1/2" }}>
          제목
        </dt>
        <dd css={tdStyle} style={{ gridColumn: "2/5" }}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 16,
            }}
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
            style={{
              width: "100%",
              boxSizing: "border-box",
              minHeight: 180,
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 15,
              resize: "vertical",
            }}
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
        <Button
          variant="outlined"
          sx={{ minWidth: 90, fontWeight: 600, fontSize: 15, mr: 1 }}
          onClick={handleListClick}
          disabled={loading}
        >
          목록
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 90, fontWeight: 600, fontSize: 15 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {isEdit ? "수정" : "작성"}
        </Button>
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
