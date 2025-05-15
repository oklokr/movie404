import { Height, InsertEmoticon, Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { User, UserMenu } from "./userinfo"
import { Dvd, DvdMenu } from "./dvd"
import { UserSet, UserSetMenu } from "./usersetting"
import { OrderList, OrderListMenu, Payment } from "./orderlist"
import { TermsA, TermsB, TermsC, TermsMenu } from "./terms"

function mypage() {
  const [subpath_orderlist, setSubpath_orderlist] = useState("1")
  const [subpath_terms, setSubpath_terms] = useState("1")
  const [path, setPath] = useState("1")
  const [emailchange, setEmailEvent] = useState(0)
  const [telchange, setTelEvent] = useState(0)
  const [emailauth, setEmailAuth] = useState(0)

  function handlePath(e) {
    if (e.target.id == "1") setPath("1")
    else if (e.target.id == "2") setPath("2")
    else if (e.target.id == "3") setPath("3")
    else if (e.target.id == "4") setPath("4")
    else if (e.target.id == "5") setPath("5")
  }
  return (
    <>
      <div>마이페이지</div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }} css={Topcontainer}>
          <Button id="1" size="large" css={Topbtn} href="#basic" onClick={handlePath}>
            회원정보
          </Button>
          <Button id="2" size="large" css={Topbtn} href="#dvd" onClick={handlePath}>
            DVD 목록
          </Button>
          <Button id="3" href="#set" size="large" css={Topbtn} onClick={handlePath}>
            설정
          </Button>
          <Button id="4" href="#order" size="large" css={Topbtn} onClick={handlePath}>
            결제
          </Button>
          <Button id="5" href="#terms" size="large" css={Topbtn} onClick={handlePath}>
            약관
          </Button>
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
  "align-content": "center",
  "border-style": "solid",
  display: "flex",
  "justify-content": "center",
  gap: "80px",
  "min-width": "1200px",
  "max-width": "1400px",
}
const Topbtn = {
  "font-size": "1.5rem",
  align: "center",
}
const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
const Leftcontainer = {
  "border-style": "solid",
  "max-width": "600px",

  height: "700px",
}
const Rightcontainer = {
  "border-style": "solid",
  "max-width": "910px",

  height: "700px",
}

export default mypage
