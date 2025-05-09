import { mypageLoginInfo } from "@/api/sample"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { css } from "@emotion/react"
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { useState } from "react"
import logoImg from "@/assets/images/logo/logo.png"

const loginWrapStyle = css`
  width: 600px;
  margin: 0 auto;
`
const logoStyle = css`
  width: 176px;
  height: 176px;
  margin: 0 auto;
  background: url(${logoImg}) no-repeat center;
  background-size: 100%;
  a {
    color: transparent;
  }
`
const loginBoxStyle = css`
  padding: 30px 40px;
  border: 1px solid #000;
  border-radius: 12px;

  h2 {
    font-size: 40px;
    margin: 0 auto;
    text-align: center;
  }
`

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleLogin = () => {
    mypageLoginInfo({
      text: "false",
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <h1>로고</h1>
      <h2>로그인</h2>
      <div className="input-form input-form--row">
        <InputLabel htmlFor="id">아이디</InputLabel>
        <OutlinedInput id="id" label="id" />
      </div>
      <div>
        <InputLabel htmlFor="password">패스워드</InputLabel>
        <OutlinedInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </div>
  )
}

export default Login
