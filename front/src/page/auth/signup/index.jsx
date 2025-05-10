import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { FormHelperText } from "@mui/material"

function signup() {
  const [commentId, setCommentId] = useState("아이디를 입력해주세요")
  const [commentPW, setCommentPW] = useState("비밀번호를 입력해주세요")
  const [commentRPW, setCommentRPW] = useState("비밀번호 재확인을 입력해주세요")
  const [commentEmail, setCommentEmail] = useState("이메일을 입력해주세요")
  const [Tel, setTel] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [PW, setPW] = useState("")

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const formA = {
    width: "15cm",
  }

  function handleChangeID(e) {
    const val = e.target.value
    if (val === "") setCommentId("아이디를 입력해주세요")
    if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentId("특수문자/한글 포함 불가")
    else setCommentId("아이디를 입력 완료!")
  }
  function handleChangePW(e) {
    const val = e.target.value
    setPW(val)
    console.log(PW)
    if (val === "") setCommentPW("비밀번호를 입력해주세요")
    else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentPW("한글 포함 불가")
    else if (!/[!@#$%^&*]/.test(val)) setCommentPW("특수문자를 포함해주세요")
    else setCommentPW("비밀번호 입력 완료!")
    //else setC
  }
  function handleChangeRPW(e) {
    const val = e.target.value
    if (val == "") setCommentRPW("비밀번호 재확인을 입력해주세요")
    else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentRPW("한글 포함 불가")
    else if (!/[!@#$%^&*]/.test(val)) setCommentRPW("특수문자를 포함해주세요")
    //else if
    else setCommentRPW("비밀번호 입력 완료!")
    //else setC
  }
  function handleChangeRPW(e) {
    const val = e.target.value
    if (val === "") setCommentRPW("비밀번호 재확인을 입력해주세요")
    else if (PW != val) setCommentRPW("비밀번호가 일치하지 않습니다")
    else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentRPW("한글 포함 불가")
    else if (!/[!@#$%^&*]/.test(val)) setCommentRPW("특수문자를 포함해주세요")
    //else if
    else setCommentRPW("비밀번호 입력 완료!")
    //else setC
  }
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
      <h1> 정보 입력 </h1>
      <div>
        <InputLabel className="input-form">아이디 </InputLabel>
        <TextField
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          required
          helperText={commentId}
          onChange={handleChangeID}
        />
        <Button variant="contained">중복확인</Button>
      </div>
      <div>
        <InputLabel>비밀번호 </InputLabel>
        <OutlinedInput
          aria-describedby="outlined-weight-helper-text"
          required
          id="signup_pwd"
          type={showPassword ? "text" : "password"}
          onChange={handleChangePW}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          //helperText={}
          //onChange={}
        />
        <FormHelperText>{commentPW}</FormHelperText>
      </div>

      <div>
        <InputLabel>비밀번호 재확인 </InputLabel>
        <OutlinedInput
          aria-describedby="outlined-weight-helper-text"
          required
          id="signup_pwd"
          type={showPassword ? "text" : "password"}
          onChange={handleChangeRPW}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          //helperText={}
          //onChange={}
        />
        <FormHelperText>{commentRPW}</FormHelperText>
      </div>

      <div>
        <InputLabel>이메일 </InputLabel>
        <OutlinedInput
          id="signup_email"
          aria-describedby="outlined-weight-helper-text"
          required
          // onChange={handleChangeEmail}
        />
        <FormHelperText>{commentEmail}</FormHelperText>

        <TextField
          id="outlined-select-currency-native"
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

      <div>
        <InputLabel>전화번호 </InputLabel>
        <OutlinedInput
          id="signup_tel"
          aria-describedby="outlined-weight-helper-text"
          required
          //onChange={}
        />
      </div>

      <Stack spacing={2} direction="row">
        <Button variant="outlined">이전</Button>
        <Button variant="contained">확인</Button>
      </Stack>
    </>
  )
}

export default signup
