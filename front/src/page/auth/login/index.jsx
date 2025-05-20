import { login } from "@/api/signup"
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
import { useState } from "react"
import logoImg from "@/assets/images/logo/logo.png"
import { useDispatch } from "react-redux"
import { setUserInfo } from "@/store/slices/user"
import { Link, useNavigate } from "react-router"

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const defaultPostForm = { id: "", passwd: "" }
  const defaultMessage = { id: "", passwd: "", error: "" }
  const [message, setMessage] = useState(defaultMessage)
  const [showPassword, setShowPassword] = useState(false)
  const [postForm, setPostForm] = useState(defaultPostForm)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleLogin = () => {
    login(postForm).then((res) => {
      const { code, data } = res
      if (code !== 200) return alert(res.msg)
      const expiryDate = new Date(data.tokenValidityStr)
      document.cookie = `authToken=${data.token}; expires=${expiryDate}; path=/; Secure; SameSite=Strict`
      dispatch(setUserInfo(data))
      navigate("/main")
    })
  }

  const handleChange = (value, key, msg) => {
    setPostForm({ ...postForm, [key]: value })
    setMessage({ ...message, [key]: value.length < 1 ? msg : "" })
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setMessage({
        error: "",
        id: "※아이디를 입력해주세요.",
        passwd: "※비밀번호를 입력해주세요.",
      })
      handleLogin()
    }
  }

  return (
    <div css={loginWrapStyle}>
      <h1 css={logoStyle}>
        <a href="/">Not404 Cinema</a>
      </h1>
      <div css={loginBoxStyle}>
        <h2>로그인</h2>
        <div className="input-item">
          <InputLabel htmlFor="id">아이디</InputLabel>
          <TextField
            id="id"
            value={postForm.id}
            error={message.id.length > 0}
            onChange={(e) => handleChange(e.target.value, "id", "※아이디를 입력해주세요.")}
            onKeyDown={handleEnter}
          />
          <FormHelperText error={message.id.length > 0}>{message.id}</FormHelperText>
        </div>
        <div className="input-item">
          <InputLabel htmlFor="password">패스워드</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={postForm.passwd}
            onChange={(e) => handleChange(e.target.value, "passwd", "※비밀번호를 입력해주세요.")}
            error={message.passwd.length > 0}
            onKeyDown={handleEnter}
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

        <ul className="link-list">
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/findId">아이디 찾기</Link>
          </li>
          <li>
            <Link to="/findPw">비밀번호 찾기</Link>
          </li>
        </ul>

        <Button variant="contained" size="large" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  )
}

const loginWrapStyle = css`
  width: 520px;
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
  border: 1px solid #999;
  border-radius: 12px;

  h2 {
    font-size: 40px;
    margin: 0 auto;
    text-align: center;
  }

  .input-item {
    width: 100%;
    height: 120px;

    &:first-of-type {
      margin-top: 40px;
    }

    .MuiFormLabel-root + .MuiFormControl-root,
    .MuiFormLabel-root + .MuiOutlinedInput-root {
      margin-top: 8px;
    }

    .MuiFormControl-root,
    .MuiOutlinedInput-root {
      width: 100%;
    }

    .MuiFormHelperText-root {
      font-size: 16px;
    }
  }

  .link-list {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 14px auto 50px;

    li {
      position: relative;
      & + li:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 100%;
        background: #d9d9d9;
        top: 0;
        bottom: 0;
        left: -12px;
        margin: auto 0;
      }
      a {
        color: #000;
        text-decoration: initial;
      }
    }
  }

  .MuiButtonBase-root {
    width: 100%;
  }
`

export default Login
