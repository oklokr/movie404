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

function User() {
  const mailformat = [
    {
      value: "naver",
      label: "@naver.com",
    },
    {
      value: "google",
      label: "@gmail.com",
    },
    {
      value: "daum",
      label: "@daum.com",
    },
    {
      value: "nate",
      label: "@nate.com",
    },
  ]
  return (
    <>
      <div className="input-form">
        <InputLabel>아이디 </InputLabel>
        <TextField
          disabled
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          defaultValue="userID"
        />
      </div>
      <div className="input-form">
        <InputLabel>비밀번호 </InputLabel>

        <div>
          <OutlinedInput
            aria-describedby="outlined-weight-helper-text"
            required
            id="signup_pwd"
            //type={showPassword ? "text" : "password"}
            //onChange={handleChangePW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                //  aria-label={showPassword ? "hide the password" : "display the password"}
                // onClick={handleClickShowPassword}
                ></IconButton>
              </InputAdornment>
            }
            //helperText={}
            //onChange={}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>비밀번호 재확인 </InputLabel>
        <div>
          <OutlinedInput
            aria-describedby="outlined-weight-helper-text"
            required
            id="signup_Rpwd"
            //type={showRePassword ? "text" : "password"}
            //onChange={handleChangeRPW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                //aria-label={showRePassword ? "hide the password" : "display the password"}
                //onClick={handleClickShowRePassword}
                ></IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{}</FormHelperText>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>이메일 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            //onChange={handleChangeEmail}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            //onChange={handleSelectEmail}
            select
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            {mailformat.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <Button variant="contained" disabled>
          인증메일 받기
        </Button>
      </div>
      <div>
        <TextField id="outlined-select-currency-native"></TextField>
      </div>

      <div className="input-form">
        <InputLabel>전화번호 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            //onChange={handleChangeEmail}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
        <Button variant="contained" disabled>
          인증메일 받기
        </Button>
      </div>

      <Button variant="contained">수정</Button>
    </>
  )
}
function Test() {
  return <h1>Test</h1>
}
function mypage() {
  const [page, setPage] = useState(User)
  const [path, setPath] = useState("1")
  function showUserPage(e) {}
  function handlePath(e) {
    if (e.target.id == "2") setPath("2")
    else if (e.target.id == "1") setPath("1")
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
          <Button href="#text-buttons" size="large" css={Topbtn} onClick={handlePath}>
            설정
          </Button>
          <Button
            href="#order"
            size="large"
            css={Topbtn}
            //onClick={handleClick}
          >
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
            <Button
              id="basic-button"
              href="#basic#user"
              size="large"
              css={Leftbtn}
              onClick={showUserPage}
            >
              기본정보
            </Button>
          ) : (
            <Button
              id="basic-button"
              href="#dvd#list"
              size="large"
              css={Leftbtn}
              //onClick={showUserPage}
            >
              전체
            </Button>
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} css={Rightcontainer}>
          {page}
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
