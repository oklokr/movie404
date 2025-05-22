import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { User, UserMenu } from "./userinfo"
import { Dvd, DvdMenu } from "./dvd"
import { UserSet, UserSetMenu } from "./usersetting"
import { OrderList, OrderListMenu, Payment } from "./orderlist"
import { TermsA, TermsB, TermsC, TermsMenu } from "./terms"
import { NavLink, useLocation } from "react-router"

function mypage() {
  const [subpath_orderlist, setSubpath_orderlist] = useState("1")
  const [subpath_terms, setSubpath_terms] = useState("1")
  const [path, setPath] = useState("1")
  const [emailchange, setEmailEvent] = useState(0)
  const [telchange, setTelEvent] = useState(0)
  const [emailauth, setEmailAuth] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [commentPW, setCommentPW] = useState("비밀번호를 입력해주세요")
  const [commentRPW, setCommentRPW] = useState("비밀번호 재확인을 입력해주세요")
  const [commentEmail, setCommentEmail] = useState("이메일을 입력해주세요")
  const [Email, setEmail] = useState("")
  const [PW, setPW] = useState("")
  const [RPW, setRPW] = useState("")

  const location = useLocation()
  useEffect(() => {
    if (location.state != null) {
      if (location.state.path == "1") setPath("1")
      else if (location.state.path == "2") setPath("2")
      else if (location.state.path == "3") setPath("3")
      else if (location.state.path == "4") setPath("4")
      else if (location.state.path == "5") setPath("5")
    }
  }, [location])
  function handlePath(e) {
    if (e.target.id == "1") setPath("1")
    else if (e.target.id == "2") setPath("2")
    else if (e.target.id == "3") setPath("3")
    else if (e.target.id == "4") setPath("4")
    else if (e.target.id == "5") setPath("5")
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }} css={Topcontainer}>
          <NavLink id="1" to="/mypage/info" css={Topbtn} onClick={handlePath}>
            회원정보
          </NavLink>
          <NavLink id="2" to="/mypage/dvd" css={Topbtn} onClick={handlePath}>
            DVD 목록
          </NavLink>
          <NavLink id="3" to="/mypage/set" css={Topbtn} onClick={handlePath}>
            설정
          </NavLink>

          <NavLink id="4" to="/mypage/order" css={Topbtn} onClick={handlePath}>
            결제
          </NavLink>
          <NavLink id="5" to="/mypage/terms" css={Topbtn} onClick={handlePath}>
            약관
          </NavLink>
        </Grid>

        <Grid size={{ xs: 6, md: 4 }} css={Leftcontainer}>
          {path == "1" ? (
            <UserMenu />
          ) : path == "2" ? (
            <DvdMenu />
          ) : path == "3" ? (
            <UserSetMenu />
          ) : path == "4" ? (
            <OrderListMenu setSubpath_orderlist={setSubpath_orderlist} />
          ) : (
            <TermsMenu setSubpath_terms={setSubpath_terms} />
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} css={Rightcontainer}>
          {path == "1" ? (
            <User
              emailchange={emailchange}
              setEmailEvent={setEmailEvent}
              telchange={telchange}
              setTelEvent={setTelEvent}
              emailauth={emailauth}
              setEmailAuth={setEmailAuth}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showRePassword={showRePassword}
              setShowRePassword={setShowRePassword}
              commentPW={commentPW}
              setCommentPW={setCommentPW}
              commentRPW={commentRPW}
              setCommentRPW={setCommentRPW}
              commentEmail={commentEmail}
              setCommentEmail={setCommentEmail}
              Email={Email}
              setEmail={setEmail}
              passwd={PW}
              setPW={setPW}
              repasswd={RPW}
              setRPW={setRPW}
            />
          ) : path == "2" ? (
            <Dvd />
          ) : path == "3" ? (
            <UserSet />
          ) : path == "4" && subpath_orderlist == "1" ? (
            <OrderList />
          ) : path == "4" && subpath_orderlist == "2" ? (
            <Payment />
          ) : path == "5" && subpath_terms == "1" ? (
            <TermsA />
          ) : path == "5" && subpath_terms == "2" ? (
            <TermsB />
          ) : path == "5" && subpath_terms == "3" ? (
            <TermsC />
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  )
}

const Topcontainer = {
  alignContent: "center",
  bordborderStyle: "solid",
  display: "flex",
  justifyContent: "center",
  gap: "80px",
  minWidth: "1200px",
  maxWidth: "1400px",
}
const Topbtn = {
  fontSize: "1.5rem",
  align: "center",
  textDecoration: "none",
}

const Leftcontainer = {
  borderStyle: "solid",
  maxWidth: "600px",

  height: "700px",
}
const Rightcontainer = {
  borderStyle: "solid",
  maxWidth: "910px",

  height: "700px",
}

export default mypage
