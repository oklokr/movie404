import { css } from "@emotion/react"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/store/selectors"
import { commonGetUserInfo } from "@/api/common"
import { setUserInfo } from "@/store/slices/user"
import { communityGetQnaList } from "@/api/community"

export default function QnaList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [search, setSearch] = useState({ title: "", writer: "" })
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [loading, setLoading] = useState(false)

  // 사용자 정보가 없으면 불러오기
  useEffect(() => {
    if (!user.info?.userId) return
    setLoading(true)
    let params = {
      userId: user.info.userId,
      isAdmin: user.info.userTpcd === "2", // 가공 없이 바로 비교
    }
    console.log("QnA API 호출 파라미터:", params)
    communityGetQnaList(params)
      .then((res) => {
        setList(res.data)
        setFiltered(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("QnA API 에러:", err)
        setList([])
        setFiltered([])
        setLoading(false)
      })
  }, [user.info?.userId, user.info?.USER_TPCD])

  const handleSearch = () => {
    setFiltered(
      list.filter(
        (item) =>
          item.title.includes(search.title) &&
          (item.userId?.includes(search.writer) || item.writer?.includes(search.writer)),
      ),
    )
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paged = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div style={{ padding: 40, background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 28 }}>1:1 문의</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <label style={{ fontWeight: 500 }}>
          제목:
          <input
            type="text"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            css={inputStyle}
          />
        </label>
        <label style={{ fontWeight: 500 }}>
          작성자:
          <input
            type="text"
            value={search.writer}
            onChange={(e) => setSearch({ ...search, writer: e.target.value })}
            css={inputStyle}
          />
        </label>
        <button onClick={handleSearch} css={btnSearch}>
          검색
        </button>
      </div>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button onClick={() => navigate("/community/qna/write")} css={btnWrite}>
          작성
        </button>
      </div>
      {loading ? (
        <div style={{ padding: 40 }}>로딩중...</div>
      ) : (
        <>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th css={thStyle}>구분</th>
                <th css={thStyle}>작성자</th>
                <th css={thStyle}>제목</th>
                <th css={thStyle}>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((item) => (
                <tr
                  key={item.qnaCode || item.id}
                  css={rowStyle}
                  onClick={() => navigate(`/community/qna/${item.qnaCode || item.id}`)}
                  tabIndex={0}
                >
                  <td css={tdStyle}>{item.reply ? "답변완료" : "답변대기"}</td>
                  <td css={tdStyle}>{item.userId || item.writer}</td>
                  <td css={tdStyle}>{item.title}</td>
                  <td css={tdStyle}>{item.writeDate || item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "0 4px",
                  padding: "4px 10px",
                  border: "1px solid #ccc",
                  background: currentPage === i + 1 ? "#0078d4" : "#fff",
                  color: currentPage === i + 1 ? "#fff" : "#333",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: currentPage === i + 1 ? 700 : 400,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
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
  margin-left: 8px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
`
const btnSearch = css`
  padding: 7px 20px;
  border: none;
  border-radius: 4px;
  background: #0078d4;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`
const btnWrite = css`
  padding: 7px 20px;
  border: none;
  border-radius: 4px;
  background: #28a745;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`
const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`
const rowStyle = css`
  cursor: pointer;
  transition:
    background 0.15s,
    box-shadow 0.15s;
  &:hover {
    background: #e6f2ff;
    box-shadow: 0 2px 8px rgba(0, 120, 212, 0.1);
    outline: 2px solid #0078d4;
    z-index: 1;
    position: relative;
  }
`
