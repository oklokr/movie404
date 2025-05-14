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
import { BrowserRouter, Route, Routes } from "react-router"
import { User, UserMenu } from "./userinfo"
import { Dvd, DvdMenu } from "./dvd"
import { UserSet, UserSetMenu } from "./usersetting"
import { OrderList, OrderListMenu } from "./orderlist"

function Test() {
  return <h1>Test</h1>
}
function mypage() {
  const [page, setPage] = useState(User)
  const [dvdpage, setdvdPage] = useState(Dvd)

  const [path, setPath] = useState("1")
  function showUserPage(e) {}
  function handlePath(e) {
    if (e.target.id == "1") setPath("1")
    else if (e.target.id == "2") setPath("2")
    else if (e.target.id == "3") setPath("3")
    else if (e.target.id == "4") setPath("4")
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
          <Button
            href="#terms"
            size="large"
            css={Topbtn}
            //onClick={handleClick}
          >
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
          ) : (
            <OrderListMenu />
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} css={Rightcontainer}>
          {path == "1" ? (
            <User />
          ) : path == "2" ? (
            <Dvd />
          ) : path == "3" ? (
            <UserSet />
          ) : (
            <OrderList />
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
