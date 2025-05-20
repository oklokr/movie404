import { css } from "@emotion/react"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectUser } from "@/store/selectors"
import { communityGetFaqList } from "@/api/community"

function Faq() {
  const user = useSelector(selectUser)
  const isAdmin = user.info?.userTpcd === "2"
  const navigate = useNavigate()
  const [faqList, setFaqList] = useState([])
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    communityGetFaqList()
      .then((res) => {
        // res가 AxiosResponse인지 배열인지 확인
        if (Array.isArray(res)) {
          setFaqList(res)
        } else if (Array.isArray(res.data)) {
          setFaqList(res.data)
        } else {
          setFaqList([])
        }
      })
      .catch(() => setFaqList([]))
  }, [])

  const handleToggle = (idx) => {
    setOpenIndex(idx === openIndex ? null : idx)
  }

  const handleWriteOrEdit = () => {
    if (openIndex === null) {
      navigate("/community/faq/write")
    } else {
      navigate(`/community/faq/${faqList[openIndex].faqCode}/edit`)
    }
  }

  return (
    <div css={wrapStyle}>
      <h1 css={titleStyle}>자주 묻는 질문</h1>
      <div css={faqBoxStyle}>
        <div css={faqTableHeader}>
          <div css={faqThStyle}>질문</div>
        </div>
        {faqList.map((item, idx) => (
          <div key={item.faqCode}>
            <div css={faqQStyle} onClick={() => handleToggle(idx)}>
              <span>{item.question}</span>
              <span css={plusStyle}>{openIndex === idx ? "−" : "+"}</span>
            </div>
            {openIndex === idx && <div css={faqAStyle}>{item.answer}</div>}
          </div>
        ))}
        <div css={bottomAreaStyle}>
          {isAdmin && (
            <button css={btnEdit} onClick={handleWriteOrEdit}>
              {openIndex === null ? "작성" : "수정"}
            </button>
          )}
        </div>
      </div>
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
const faqBoxStyle = css`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 0 0 28px 0;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`
const faqTableHeader = css`
  display: grid;
  grid-template-columns: 1fr;
  background: #f0f0f0;
  border-radius: 8px 8px 0 0;
`
const faqThStyle = css`
  border: 1px solid #e0e0e0;
  padding: 12px 8px;
  font-weight: 700;
  font-size: 1rem;
`
const faqQStyle = css`
  font-size: 1rem;
  font-weight: 500;
  padding: 16px 12px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.15s;
  &:hover {
    background: #e6f2ff;
  }
`
const plusStyle = css`
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 12px;
`
const faqAStyle = css`
  background: #e5e5e5;
  padding: 18px 18px;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  border-bottom: 1px solid #e0e0e0;
`
const bottomAreaStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-right: 12px;
`
const btnEdit = css`
  padding: 7px 20px;
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

export default Faq
