import OutlinedInput from "@mui/material/OutlinedInput"
import { FormHelperText } from "@mui/material"
import { Button, InputLabel, TextField } from "@mui/material"
import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useState } from "react"
import { sendAuthEmail, signupCheckEmail } from "@/api/signup"
import { checkUserByIdEmail } from "@/api/findpw"
import { useModal } from "@/component/modalProvider"
import { useNavigate } from "react-router"

const findid_info = {
  id: "",
  pwd: "",
  email: "",
  authcode: "",
}
function findPw() {
  const { openModal, showAlert } = useModal()
  const navigate = useNavigate()
  const [radio, setRadio] = useState("email")
  const [TelButtonActive, setTelButtonActive] = useState(0)
  const [EmailButtonActive, setEmailButtonActive] = useState(0)
  const [AuthButtonActive, setAuthButtonActive] = useState(0)
  const [commentTel, setCommentTel] = useState("휴대폰 번호를 입력해주세요.")
  const [commentEmail, setCommentEmail] = useState("이메일을 입력해주세요")
  const [commentID, setCommentID] = useState("아이디를 입력해주세요")
  const [Email, setEmail] = useState("")
  const [ID, setID] = useState("")

  const [InputCode, setInputCode] = useState("")

  function handleChangeId(e) {
    setID(e.target.value)
  }
  function handleChangeEmail(e) {
    const val = e.target.value
    setEmailButtonActive(0)
    if (val === "") setCommentEmail("이메일을 입력해주세요")
    else if (/[!#$%^&*/|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) setCommentEmail("특수문자/한글 포함 불가")
    else if (!/^[a-z|A-Z|0-9|_\-.]+@[a-z|A-Z|0-9]+\.[a-z|A-Z]{2,}$/.test(val))
      setCommentEmail("이메일 형식을 바르게 입력해주세요")
    else {
      setEmail(val)
      setCommentEmail("인증해주세요")
      setEmailButtonActive(1)
    }
  }

  function handleChange(e) {
    setRadio(e.target.value)
  }
  function handleChangeTel(e) {
    var val = e.target.value
    var length = val.length

    setTelButtonActive(0)
    if (length == 14) {
      val = val.substring(0, length - 1)
      e.target.value = val
    }
    if (/^010-([0-9]{4})-([0-9]{4})$/.test(val)) {
      setTelButtonActive(1)
    } else if (length == 9 && /^010-([0-9]{4})/.test(val) && val.indexOf("-", 7) != 8) {
      val = val.substring(0, 8) + "-" + val.substring(8, length)
      e.target.value = val
    } else if (length == 4 && /^010/.test(val) && val.indexOf("-") != 3) {
      val = val.substring(0, 3) + "-" + val.substring(3, length)
      e.target.value = val
    }
  }
  const sendEmail = () => {
    sendAuthEmail({
      email: Email,
    }).then((res) => {
      if (res.code === 200) {
        showAlert({ message: "인증메일을 전송했습니다!", type: "success" })
        findid_info.authcode = res.data
        findid_info.email = Email
        setAuthButtonActive(1)
      }
    })
  }
  const checkEmail = () => {
    signupCheckEmail({
      email: Email,
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        showAlert({ message: "등록되지 않은 이메일 입니다.", type: "error" })

        //메일전송
      } else {
        showAlert({ message: "인증번호 전송 중", type: "success" })
        sendEmail()
      }
    })
  }

  function sendEailEventHandler(e) {
    checkEmail()
  }
  function authEmailCheck(e) {
    if (InputCode == findid_info.authcode) {
      showAlert({ message: "인증번호가 일치합니다", type: "success" })

      showPw()
    } else showAlert({ message: "인증번호가 일치하지 않습니다!", type: "error" })
  }

  function handleChangeAuth(e) {
    const val = e.target.value
    setInputCode(val)
  }

  const showPw = () => {
    checkUserByIdEmail({
      id: ID,
      email: findid_info.email,
    }).then((res) => {
      if (res.code === 200) {
        navigate("/resultPw", { state: res.data })
      } else {
        showAlert({ message: "등록되지 않은 아이디입니다!", type: "error" })
      }
    })
  }
  return (
    <>
      <h1> 비밀번호 찾기 </h1>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">인증방법 선택</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="email"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="email" control={<Radio />} label="이메일 인증" />
          <FormControlLabel value="tel" control={<Radio />} label="휴대폰번호 인증" />
        </RadioGroup>
      </FormControl>
      <div className="input-form">
        <InputLabel>아이디 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            onChange={handleChangeId}
          />

          <FormHelperText>{commentID}</FormHelperText>
        </div>
      </div>
      {radio === "email" ? (
        <>
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
            {EmailButtonActive == 0 ? (
              <Button variant="contained" disabled>
                이메일 인증
              </Button>
            ) : (
              <Button variant="contained" onClick={sendEailEventHandler}>
                이메일 인증
              </Button>
            )}
          </div>
          <div className="input-form">
            <InputLabel>인증번호 </InputLabel>
            <OutlinedInput
              id="signup_email"
              aria-describedby="outlined-weight-helper-text"
              required
              onChange={handleChangeAuth}
            />
            {AuthButtonActive == 0 ? (
              <Button variant="contained" disabled>
                인증요청
              </Button>
            ) : (
              <Button variant="contained" onClick={authEmailCheck}>
                인증요청
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <InputLabel className="input-form">휴대폰 인증 </InputLabel>
          <TextField
            id="signup_id"
            aria-describedby="outlined-weight-helper-text"
            required
            helperText={commentTel}
            onChange={handleChangeTel}
          />
          {TelButtonActive == 0 ? (
            <Button variant="contained" disabled>
              휴대폰 인증
            </Button>
          ) : (
            <Button variant="contained">휴대폰 인증</Button>
          )}
        </>
      )}

      <Button
        variant="outlined"
        onClick={() => {
          navigate("/login")
        }}
      >
        이전
      </Button>
    </>
  )
}

export default findPw
