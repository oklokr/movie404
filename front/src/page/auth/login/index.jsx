import { mypageLoginInfo } from "@/api/sample"
import { Password, Visibility, VisibilityOff } from "@mui/icons-material"
import { css } from "@emotion/react"
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { useEffect, useState } from "react"
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
  const defaultPostForm = {
    id: "",
    password: "",
  }
  const [showPassword, setShowPassword] = useState(false)
  const [postForm, setPostForm] = useState(defaultPostForm)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleLogin = () => {
    mypageLoginInfo({
      text: "false",
    }).then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    console.log("폼 변경됨:", postForm)
  }, [postForm])

  return (
    <div css={loginWrapStyle}>
      <h1 css={logoStyle}>
        <a href="/">Not404 Cinema</a>
      </h1>
      <div css={loginBoxStyle}>
        <h2>로그인</h2>
        <div className="input-form input-form--row">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <OutlinedInput
            id="id"
            label="id"
            value={postForm.id}
            onChange={(e) => setPostForm({ ...postForm, id: e.target.value })}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">패스워드</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={postForm.password}
            onChange={(e) =>
              setPostForm({ ...postForm, password: e.target.value })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <Button variant="contained" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  )
}

export default Login
