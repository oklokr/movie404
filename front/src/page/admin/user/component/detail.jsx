import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router"
import { css } from "@emotion/react"
import { fetchUserDetail, resetUserPassword, updateUserType } from "@/api/admin"
import Button from "@mui/material/Button"
import { useModal } from "@/component/modalProvider"

const userTypeList = ["일반회원", "VIP회원", "탈퇴회원", "관리자"]

const userTypeToCode = {
  일반회원: "1",
  VIP회원: "3",
  탈퇴회원: "4",
  관리자: "2",
}
const codeToUserType = {
  1: "일반회원",
  2: "관리자",
  3: "VIP회원",
  4: "탈퇴회원",
}

export default function AdminUserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState("")
  const [type, setType] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const { openModal, closeModal, showAlert } = useModal()

  useEffect(() => {
    setUser(null)
    setPassword("")
    setType("")
    setNotFound(false)
    fetchUserDetail(id)
      .then((res) => {
        const data = res.data ? res.data : res
        if (!data || !data.userId) {
          setNotFound(true)
        } else {
          setUser({
            id: data.userId,
            name: data.userName,
            email: data.email,
            tel: data.tel,
            joinDate: data.signupDateStr || data.signupDate,
            totalPay: data.totalPay ?? 0,
            buyCount: data.buyCount ?? 0,
            reserveCount: data.reserveCount ?? 0,
            type: codeToUserType[data.userTpcd] || "",
          })
          setPassword("********")
          setType(codeToUserType[data.userTpcd] || "")
        }
      })
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) return <div css={notFoundStyle}>존재하지 않는 사용자입니다.</div>
  if (!user) return <div>로딩중...</div>

  const handleResetPassword = () => {
    openModal({
      title: "비밀번호 초기화",
      content: "비밀번호를 1234로 초기화하시겠습니까?",
      type: "confirm",
      fn: async () => {
        closeModal()
        setLoading(true)
        try {
          await resetUserPassword(user.id)
          setPassword("1234")
          showAlert({ message: "비밀번호가 1234로 초기화되었습니다.", type: "success" })
        } catch {
          showAlert({ message: "비밀번호 초기화 실패", type: "error" })
        }
        setLoading(false)
      },
    })
  }

  const handleTypeChange = (e) => setType(e.target.value)
  const handleApplyType = async () => {
    setLoading(true)
    try {
      await updateUserType(user.id, userTypeToCode[type])
      setUser({ ...user, type })
      showAlert({ message: "사용자 유형이 변경되었습니다.", type: "success" })
    } catch {
      showAlert({ message: "유형 변경 실패", type: "error" })
    }
    setLoading(false)
  }
  const handleGoList = () => {
    const search = location.search
    navigate(`/admin/user${search}`)
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
          <Button
            variant="outlined"
            sx={{ alignSelf: "flex-end", mt: 2, minWidth: 120, fontWeight: 600 }}
            onClick={handleResetPassword}
            disabled={loading}
          >
            비밀번호 초기화
          </Button>
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
            <select css={selectStyle} value={type} onChange={handleTypeChange} disabled={loading}>
              {userTypeList.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end", mt: 2, minWidth: 120, fontWeight: 600 }}
            onClick={handleApplyType}
            disabled={loading}
          >
            적용
          </Button>
        </div>
      </div>
      <div css={btnRow}>
        <Button
          variant="outlined"
          sx={{ minWidth: 120, fontWeight: 600, fontSize: 17 }}
          onClick={handleGoList}
        >
          목록
        </Button>
      </div>
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
  border: 1.5px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 15px;
`
const btnRow = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`
