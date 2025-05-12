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
import { useEffect } from "react"
import { signupCheckId } from "@/api/signup"

const user_info = {
  id: "",
  pwd: "",
  email: "",
}
function signup() {
  const [commentId, setCommentId] = useState("아이디를 입력해주세요")
  const [commentPW, setCommentPW] = useState("비밀번호를 입력해주세요")
  const [commentRPW, setCommentRPW] = useState("비밀번호 재확인을 입력해주세요")
  const [commentEmail, setCommentEmail] = useState("이메일을 입력해주세요")
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const [ID, setID] = useState("")
  const [PW, setPW] = useState("")
  const [RPW, setRPW] = useState("")

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowRePassword = () => setShowRePassword((show) => !show)

  useEffect(() => {
    console.log(PW)
    console.log(RPW)
    if (PW != "" && RPW != "") {
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(RPW)) {
        setCommentRPW("한글 포함 불가")
        user_info.pwd = ""
      } else if (!/[!@#$%^&*]/.test(RPW)) {
        setCommentRPW("특수문자를 포함해주세요")
        user_info.pwd = ""
      } else if (PW != RPW) {
        setCommentRPW("비밀번호가 일치하지 않습니다.")
        user_info.pwd = ""
      } else {
        setCommentRPW("비밀번호가 일치합니다.")
        user_info.pwd = RPW
      }
    }
  }, [PW, RPW])

  function handleChangeID(e) {
    const val = e.target.value
    setID(val)
    if (val === "") setCommentId("아이디를 입력해주세요")
    if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentId("특수문자/한글 포함 불가")
    else {
      setCommentId("아이디를 입력 완료!")
    }
  }
  function handleChangePW(e) {
    const val = e.target.value
    setPW(val)

    if (val === "") setCommentPW("비밀번호를 입력해주세요")
    else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentPW("한글 포함 불가")
    else if (!/[!@#$%^&*]/.test(val)) setCommentPW("특수문자를 포함해주세요")
    else setCommentPW("비밀번호 입력 완료!")
  }
  function handleChangeRPW(e) {
    const val = e.target.value
    setRPW(val)

    if (val === "") setCommentRPW("비밀번호 재확인을 입력해주세요")
  }
  function handleChangeEmail(e) {
    const val = e.target.value

    if (val === "") setCommentEmail("이메일을 입력해주세요")
    if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentEmail("특수문자/한글 포함 불가")
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

  function SignUpEvent(e) {
    if (ID == "") {
      alert("아이디를 입력해주세요")
    } else if (user_info.id == "") {
      alert("아이디 중복확인을 해주세요")
    } else if (RPW == "" || user_info.pwd == "") {
      alert("비밀번호를 입력해주세요")
    }
  }

  const checkId = () => {
    signupCheckId({
      id: ID,
    }).then((res) => {
      console.log(res)
    })
  }

  function CheckIdEvent(e) {
    if (ID == "") {
      alert("아이디를 입력해주세요")
    } else if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(ID)) {
      alert("특수문자/한글 포함 불가")
    } else {
      alert(ID)
      checkId()
      //DB에 중복확인
    }
  }
  return (
    <>
      <h1> 정보 입력 </h1>
      <div className="input-form">
        <InputLabel>아이디 </InputLabel>
        <TextField
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          required
          helperText={commentId}
          onChange={handleChangeID}
        />
        <Button variant="contained" onClick={CheckIdEvent}>
          중복확인
        </Button>
      </div>
      <div className="input-form">
        <InputLabel>비밀번호 </InputLabel>

        <div>
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
      </div>

      <div className="input-form">
        <InputLabel>비밀번호 재확인 </InputLabel>
        <div>
          <OutlinedInput
            aria-describedby="outlined-weight-helper-text"
            required
            id="signup_Rpwd"
            type={showRePassword ? "text" : "password"}
            onChange={handleChangeRPW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showRePassword ? "hide the password" : "display the password"}
                  onClick={handleClickShowRePassword}
                >
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{commentRPW}</FormHelperText>
        </div>
      </div>

      <div className="input-form">
        <InputLabel>이메일 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            onChange={handleChangeEmail}
          />
          <FormHelperText>{commentEmail}</FormHelperText>
        </div>
        <div>
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
        <Button variant="contained">이메일 인증하기</Button>
      </div>

      <Stack spacing={2} direction="row">
        <Button variant="outlined">이전</Button>
        <Button variant="contained" onClick={SignUpEvent}>
          확인
        </Button>
      </Stack>
    </>
  )
}

export default signup
