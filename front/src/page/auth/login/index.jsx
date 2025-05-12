import { mypageLoginInfo } from "@/api/sample"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { css } from "@emotion/react"
import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import logoImg from "@/assets/images/logo/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "@/store/slices/user"
import { selectUser } from "@/store/selectors"

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
  const dispatch = useDispatch()
  const defaultPostForm = { id: "", passwd: "" }
  const defaultMessage = { id: "", passwd: "", error: "" }
  const [message, setMessage] = useState(defaultMessage)
  const [showPassword, setShowPassword] = useState(false)
  const [postForm, setPostForm] = useState(defaultPostForm)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleLogin = () => {
    mypageLoginInfo(postForm).then((res) => {
      const { code, data } = res
      if (code !== 200) return alert(res.msg)
      const expiryDate = new Date(data.tokenValidityStr)
      document.cookie = `authToken=${data.token}; expires=${expiryDate}; path=/; Secure; SameSite=Strict`
      dispatch(setUserInfo(data))
    })
  }

  const handleChange = (value, key, msg) => {
    setPostForm({ ...postForm, [key]: value })
    setMessage({ ...message, [key]: value.length < 1 ? msg : "" })
  }

  return (
    <div css={loginWrapStyle}>
      <h1 css={logoStyle}>
        <a href="/">Not404 Cinema</a>
      </h1>
      <div css={loginBoxStyle}>
        <h2>로그인</h2>
        <div className="input-form input-form--row">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <TextField
            id="id"
            value={postForm.id}
            error={message.id.length > 0}
            onChange={(e) => handleChange(e.target.value, "id", "아이디를 입력해주세요.")}
          />
          <FormHelperText error={message.id.length > 0}>{message.id}</FormHelperText>
        </div>
        <div>
          <InputLabel htmlFor="password">패스워드</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={postForm.passwd}
            onChange={(e) => handleChange(e.target.value, "passwd", "비밀번호를 입력해주세요.")}
            error={message.passwd.length > 0}
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
          <FormHelperText error={message.passwd.length > 0}>{message.passwd}</FormHelperText>
        </div>
        <Button variant="contained" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  )
}

export default Login
