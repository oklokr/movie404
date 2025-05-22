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
import { insertUser, sendAuthEmail, signupCheckEmail, signupCheckId } from "@/api/signup"
import { useNavigate, useLocation } from "react-router"
import { useModal } from "@/component/modalProvider"

const { showAlert } = useModal()
const user_info = {
  id: "",
  pwd: "",
  email: "",
  terms: "",
  authcode: "",
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
  const [Email, setEmail] = useState("")
  const [EmailFormat, setEmailFormat] = useState("@naver.com")
  const [InputCode, setInputCode] = useState("")
  const [SendMail, setSendMail] = useState(0)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowRePassword = () => setShowRePassword((show) => !show)

  const navigate = useNavigate()
  const location = useLocation()
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
    setEmail("")
    if (val === "") setCommentEmail("이메일을 입력해주세요")
    else if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentEmail("특수문자/한글 포함 불가")
    else {
      setEmail(val)
    }
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
      showAlert({ message: "아이디를 입력해주세요", type: "error" })
    } else if (user_info.id == "") {
      showAlert({ message: "아이디 중복확인을 해주세요", type: "error" })
    } else if (RPW == "" || user_info.pwd == "") {
      showAlert({ message: "비밀번호를 입력해주세요", type: "error" })
    } else if (Email == "" || user_info.authcode != "인증완료") {
      showAlert({ message: "이메일 인증을 완료해주세요", type: "error" })
    } else {
      showAlert({ message: "가입중!", type: "success" })

      newUser()
    }
  }
  const newUser = () => {
    insertUser({
      id: user_info.id,
      pwd: user_info.pwd,
      email: user_info.email,
      terms: location.state,
    }).then((res) => {
      if (res.code === 200) {
        showAlert({ message: "가입성공!", type: "success" })

        navigate("/result")
      }
    })
  }
  const checkId = () => {
    signupCheckId({
      id: ID,
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        user_info.id = ID
        showAlert({ message: "사용 가능한 아이디 입니다.", type: "success" })
      } else {
        user_info.id = ""
        showAlert({ message: "사용불가한 아이디 입니다.", type: "error" })
      }
    })
  }

  const checkEmail = () => {
    signupCheckEmail({
      email: Email + EmailFormat,
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        user_info.email = Email + EmailFormat
        showAlert({ message: "사용 가능한 이메일 입니다.", type: "success" })

        //메일전송
        sendEmail()
      } else {
        user_info.id = ""
        showAlert({ message: "이미 등록된 이메일 입니다.", type: "error" })
      }
    })
  }

  const sendEmail = () => {
    sendAuthEmail({
      email: user_info.email,
    }).then((res) => {
      if (res.code === 200) {
        showAlert({ message: "인증메일을 전송했습니다!", type: "success" })

        user_info.authcode = res.data
        setSendMail(1)
      }
    })
  }

  function CheckIdEvent(e) {
    if (ID == "") {
      showAlert({ message: "아이디를 입력해주세요", type: "error" })
    } else if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(ID)) {
      showAlert({ message: "특수문자/한글 포함 불가", type: "error" })
    } else {
      //alert(ID)
      checkId()
      //DB에 중복확인
    }
  }

  function checkEmailEvent(e) {
    if (Email == "") {
      showAlert({ message: "이메일을 입력해주세요", type: "error" })
    } else {
      //alert(Email + EmailFormat)
      checkEmail()
    }
  }
  function handleSelectEmail(e) {
    setEmailFormat(e.target.value)
  }

  function authEmailCheck(e) {
    if (InputCode == user_info.authcode) {
      showAlert({ message: "인증번호가 일치합니다!", type: "success" })

      user_info.authcode = "인증완료"
    } else showAlert({ message: "인증번호가 일치하지 않습니다!", type: "error" })
  }

  function userInputEvent(e) {
    setInputCode(e.target.value)
  }
  function previousPage(e) {
    navigate("/terms")
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
            onChange={handleSelectEmail}
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
        <Button variant="contained" onClick={checkEmailEvent}>
          인증메일 받기
        </Button>
      </div>
      <div>
        <TextField id="outlined-select-currency-native" onChange={userInputEvent}></TextField>
        {SendMail == 0 ? (
          <Button variant="contained" disabled>
            {" "}
            인증요청{" "}
          </Button>
        ) : (
          <Button variant="contained" onClick={authEmailCheck}>
            {" "}
            인증요청{" "}
          </Button>
        )}
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={previousPage}>
          이전
        </Button>
        <Button variant="contained" onClick={SignUpEvent}>
          확인
        </Button>
      </Stack>
    </>
  )
}

export default signup
