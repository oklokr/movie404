import { mypageLoginInfo } from "@/api/sample"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { css } from "@emotion/react"
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { useState } from "react"

const test = css`
  color: red;
`

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  // mypageLoginInfo({
  //   text: "false",
  // }).then((res) => {
  //   console.log(res)
  // })

  return (
    <div>
      <h1>로고</h1>
      <h2>로그인</h2>
      <div className="input-form">
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
