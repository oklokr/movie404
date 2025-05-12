import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { css } from "@emotion/react"
// import { fetchUserDetail } from "@/api/admin" // 실제 API 연동 시 사용

const userTypeList = ["일반회원", "VIP회원", "탈퇴회원", "관리자"]

export default function AdminUserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState("")
  const [type, setType] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // 실제 서비스에서는 API로 유저 상세정보를 받아옵니다.
  useEffect(() => {
    setUser(null)
    setPassword("")
    setType("")
    setNotFound(false)
    // fetchUserDetail(id)
    //   .then((data) => {
    //     if (!data) {
    //       setNotFound(true)
    //     } else {
    //       setUser(data)
    //       setPassword(data.password)
    //       setType(data.type)
    //     }
    //   })
    //   .catch(() => {
    //     setNotFound(true)
    //   })
    // 백엔드 미구현 시 아래처럼 처리 (임시)
    setTimeout(() => {
      setNotFound(true)
    }, 300)
  }, [id])

  if (notFound) return <div css={notFoundStyle}>존재하지 않는 사용자입니다.</div>
  if (!user) return <div>로딩중...</div>

  // 비밀번호 초기화 버튼 클릭 시 확인 모달 표시
  const handleResetPassword = () => {
    setShowConfirm(true)
  }

  // 확인 모달에서 "확인" 클릭 시 실제 초기화
  const handleConfirmReset = () => {
    setPassword("1234")
    setShowConfirm(false)
  }

  // 확인 모달에서 "취소" 클릭 시
  const handleCancelReset = () => {
    setShowConfirm(false)
  }

  // 사용자 유형 변경
  const handleTypeChange = (e) => {
    setType(e.target.value)
  }

  // 적용 버튼 (실제 DB 반영은 API 연동 시 구현)
  const handleApplyType = () => {
    setUser({ ...user, type })
  }

  // 저장 버튼 (실제 DB 반영은 API 연동 시 구현)
  const handleSave = () => {
    alert("저장되었습니다.")
  }

  // 목록(뒤로가기) 버튼
  const handleGoList = () => {
    navigate("/admin/user")
  }

  return (
    <div css={detailWrap}>
      <h2 css={detailTitle}>회원관리 상세</h2>
      <div css={infoRow}>
        {/* 기본정보 */}
        <div css={infoBox}>
          <div css={infoTitle}>기본정보</div>
          <div css={infoItem}>
            <span>아이디</span>
            <span>{user.id}</span>
          </div>
          <div css={infoItem}>
            <span>이름</span>
            <span>{user.name}</span>
          </div>
          <div css={infoItem}>
            <span>비밀번호</span>
            <span>{password}</span>
          </div>
          <div css={infoItem}>
            <span>이메일</span>
            <span>{user.email}</span>
          </div>
          <div css={infoItem}>
            <span>전화번호</span>
            <span>{user.tel}</span>
          </div>
          <button css={resetBtn} onClick={handleResetPassword}>
            비밀번호 초기화
          </button>
        </div>
        {/* 사이트 이용정보 */}
        <div css={infoBox}>
          <div css={infoTitle}>사이트 이용정보</div>
          <div css={infoItem}>
            <span>가입일자</span>
            <span>{user.joinDate}</span>
          </div>
          <div css={infoItem}>
            <span>총 지불 금액</span>
            <span>{user.totalPay}</span>
          </div>
          <div css={infoItem}>
            <span>구매 횟수</span>
            <span>{user.buyCount}</span>
          </div>
          <div css={infoItem}>
            <span>예매 횟수</span>
            <span>{user.reserveCount}</span>
          </div>
          <div css={infoItem}>
            <span>사용자 유형</span>
            <select css={selectStyle} value={type} onChange={handleTypeChange}>
              {userTypeList.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <button css={applyBtn} onClick={handleApplyType}>
            적용
          </button>
        </div>
      </div>
      <div css={btnRow}>
        <button css={listBtn} onClick={handleGoList}>
          목록
        </button>
        <button css={saveBtn} onClick={handleSave}>
          저장
        </button>
      </div>
      {showConfirm && (
        <div css={modalOverlay}>
          <div css={modalBox}>
            <div css={modalMsg}>비밀번호를 1234로 초기화하시겠습니까?</div>
            <div css={modalBtnRow}>
              <button css={modalBtn} onClick={handleConfirmReset}>
                확인
              </button>
              <button css={modalBtn} onClick={handleCancelReset}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const notFoundStyle = css`
  padding: 80px 0;
  text-align: center;
  color: #ff3d00;
  font-size: 20px;
  font-weight: 600;
`

// 이하 CSS 동일
const detailWrap = css`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
  padding: 40px 32px 32px 32px;
  border: 1.5px solid #e0e0e0;
`
const detailTitle = css`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 36px;
  color: #222;
`
const infoRow = css`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 32px;
`
const infoBox = css`
  flex: 1;
  min-width: 340px;
  max-width: 420px;
  border: 1.5px solid #bbb;
  border-radius: 8px;
  padding: 28px 24px 24px 24px;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const infoTitle = css`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #222;
`
const infoItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  span:first-of-type {
    color: #444;
    font-weight: 500;
    min-width: 90px;
  }
  span:last-of-type {
    color: #222;
    font-weight: 400;
    word-break: break-all;
  }
  select {
    margin-left: 8px;
  }
`
const selectStyle = css`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
`
const resetBtn = css`
  margin-top: 18px;
  align-self: flex-end;
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #bbb;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
  }
`
const applyBtn = css`
  margin-top: 18px;
  align-self: flex-end;
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #bbb;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
  }
`
const btnRow = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`
const listBtn = css`
  padding: 12px 36px;
  border: none;
  border-radius: 6px;
  background: #eee;
  color: #222;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #bbb;
    color: #fff;
  }
`
const saveBtn = css`
  padding: 12px 48px;
  border: none;
  border-radius: 6px;
  background: #eee;
  color: #222;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff9800;
    color: #fff;
  }
`
const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`
const modalBox = css`
  background: #fff;
  border-radius: 10px;
  padding: 32px 32px 24px 32px;
  min-width: 320px;
  box-shadow: 0 4px 24px #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const modalMsg = css`
  font-size: 17px;
  color: #222;
  margin-bottom: 24px;
  text-align: center;
`
const modalBtnRow = css`
  display: flex;
  gap: 18px;
`
const modalBtn = css`
  padding: 8px 28px;
  border: none;
  border-radius: 4px;
  background: #222;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #ff9800;
  }
`
