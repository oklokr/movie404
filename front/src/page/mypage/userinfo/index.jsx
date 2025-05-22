import { sendSMS, smsAuth, updateUser } from "@/api/admin"
import { sendAuthEmail, signupCheckEmail } from "@/api/signup"
import { selectUser } from "@/store/selectors"
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
import { useSelector } from "react-redux"
import { Navigate, NavLink, useNavigate } from "react-router"
import { useModal } from "@/component/modalProvider"
const { openModal, showAlert } = useModal()

const userchange = {
  pwd: "",
  repwd: "",
  pwdpass: 0,
  repwdpass: 0,
  email: "",
  domain: "",
  sendemail: 0,
  authcode: "",
  inputauthcode: "",
  tel: "",
}

function UserMenu() {
  return (
    <NavLink id="basic-button" to="/mypage/info/user" css={Leftbtn}>
      기본정보
    </NavLink>
  )
}
function User(props) {
  const mailformat = [
    {
      value: "naver",
      label: "@naver.com",
    },
    {
      value: "gmail",
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
  const navigate = useNavigate()

  let state = useSelector(selectUser)
  if (!state.info || state.info === null || state.info === undefined) {
    return <div>로딩</div>
  } else {
    const userinfo = {
      id: "",
      pwd: "",
      email: "",
      domain: "",
      tel: "",
    }
    userinfo.id = state.info.userId
    userinfo.email = state.info.email.substring(0, state.info.email.indexOf("@"))
    userinfo.domain = state.info.email.substring(
      state.info.email.indexOf("@") + 1,
      state.info.email.length,
    )
    userinfo.tel = state.info.tel
    if (userchange.email == "") userchange.email = userinfo.email
    if (userchange.domain == "") userchange.domain = userinfo.domain

    function handlerSaveEvent() {
      var check = 1
      if (userchange.pwd == "") {
        showAlert({ message: "비밀번호를 입력해주세요", type: "error" })
        check = 0
      } else if (userchange.repwd == "") {
        showAlert({ message: "비밀번호 재확인을 입력해주세요", type: "error" })

        check = 0
      } else if (userchange.pwd != userchange.repwd) {
        showAlert({ message: "비밀번호가 일치하지 않습니다.", type: "error" })

        check = 0
      } else if (userchange.pwdpass != 1 || userchange.repwdpass != 1) {
        showAlert({ message: "비밀번호 입력 조건을 확인해주세요", type: "error" })

        check = 0
      } else if (userchange.sendemail == 1) {
        if (userchange.authcode != "인증완료") {
          showAlert({ message: "이메일 인증을 완료해주세요", type: "error" })

          check = 0
        } else {
          check = 1
          //DB업데이트 코드
        }
      }

      if (check == 1) {
        updateuser()
      }
    }
    const updateuser = () => {
      //if(userchange)
      updateUser({
        id: userinfo.id,
        pwd: userchange.pwd,
        email: userchange.email + "@" + userchange.domain,
        // tel: userchange.tel,
      }).then((res) => {
        if (res.code === 200) {
          showAlert({ message: "수정완료", type: "success" })
        } else {
          showAlert({ message: "수정 실패!", type: "error" })
        }
      })
    }

    function handleCheckEamilAuth(e) {
      if (userchange.authcode == userchange.inputauthcode) {
        showAlert({ message: "이메일 인증 성공!", type: "success" })

        userchange.authcode = "인증완료"
        props.setEmailEvent(0)
        props.setEmailAuth(0)
      } else {
        showAlert({ message: "인증실패", type: "error" })
      }
    }
    function handleChangeEmail(e) {
      //초기값설정
      const val = e.target.value
      userchange.email = ""
      if (val === "") {
        props.setCommentEmail("이메일을 입력해주세요")
        userchange.sendemail = 1
      }
      if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) {
        props.setCommentEmail("특수문자/한글 포함 불가")
        userchange.sendemail = 1
      }
      if (val == userinfo.email) {
        props.setEmailEvent(0)
        props.setEmailAuth(0)
        userchange.sendemail = 0
      } else {
        userchange.sendemail = 1

        props.setEmailEvent(1)
        userchange.email = val
      }
      props.setEmail(val)
    }
    function handleSelectEmail(e) {
      const val = e.target.value + ".com"
      if (val == userinfo.domain) {
        if (props.Email == userinfo.email) props.setEmailEvent(0)
        else {
          props.setEmailEvent(1)
          userchange.domain = val
        }
        props.setEmailAuth(0)
      } else {
        props.setEmailEvent(1)
        userchange.domain = val
      }
    }
    const sendEmail = () => {
      sendAuthEmail({
        email: userchange.email + "@" + userchange.domain,
      }).then((res) => {
        if (res.code === 200) {
          showAlert({ message: "인증메일을 전송했습니다!", type: "success" })

          userchange.authcode = res.data
          userchange.sendemail = 1
        } else {
          showAlert({ message: "전송실패", type: "error" })
        }
      })
    }

    const checkEmail = () => {
      signupCheckEmail({
        email: props.Email + props.EmailFormat,
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          userinfo.email = props.Email + props.EmailFormat
          showAlert({ message: "사용 가능한 이메일 입니다.", type: "success" })

          //메일전송
          sendEmail()
        } else {
          showAlert({ message: "이미 등록된 이메일 입니다.", type: "error" })
        }
      })
    }
    function handleClickEamilAuth(e) {
      checkEmail()

      props.setEmailAuth(1)
    }
    function handleChangeInputAuth(e) {
      userchange.inputauthcode = e.target.value
    }
    const [tel, setTel] = useState(userinfo.tel)
    const [sendsms, isSendSMS] = useState(0)
    const [smsinput, setSMSInput] = useState("")
    function handleChangeTel(e) {
      setTel(e.target.value)
      if (e.target.value == userinfo.tel) props.setTelEvent(0)
      else props.setTelEvent(1)
    }

    function handleChangePW(e) {
      const val = e.target.value
      userchange.pwd = val
      userchange.pwdpass = 0
      if (val === "") props.setCommentPW("비밀번호를 입력해주세요")
      else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) props.setCommentPW("한글 포함 불가")
      else if (!/[!@#$%^&*]/.test(val)) props.setCommentPW("특수문자를 포함해주세요")
      else {
        props.setCommentPW("비밀번호 입력 완료!")
        userchange.pwdpass = 1
      }
    }
    function handleChangeRPW(e) {
      const val = e.target.value
      userchange.repwd = val
      userchange.repwdpass = 0

      if (val === "") props.setCommentRPW("비밀번호 재확인을 입력해주세요")
      else if (userchange.pwd == userchange.repwd) {
        props.setCommentRPW("비밀번호가 일치합니다.")
        userchange.repwdpass = 1
      } else if (userchange.pwd != userchange.repwd) {
        props.setCommentRPW("비밀번호가 일치하지 않습니다.")
      }
    }
    function handlerAuthTelEvent(e) {
      const sendsms = () => {
        sendSMS({ phone: tel }).then((res) => {
          console.log(res)
          isSendSMS(1)
        })
      }
      sendsms()
    }
    function handleSMSAuth(e) {
      const smsauth = () => {
        smsAuth({ code: smsinput }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            showAlert({ message: "인증성공!", type: "success" })

            isSendSMS(0)
          }
        })
      }
      smsauth()
    }
    return (
      <>
        <div className="input-form">
          <InputLabel>아이디 </InputLabel>
          <TextField
            disabled
            id="signup_id"
            aria-describedby="outlined-weight-helper-text"
            defaultValue={userinfo.id}
          />
        </div>
        <div className="input-form">
          <InputLabel>비밀번호 </InputLabel>

          <div>
            <OutlinedInput
              aria-describedby="outlined-weight-helper-text"
              required
              id="signup_pwd"
              type={props.showPassword ? "text" : "password"}
              onChange={handleChangePW}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={props.showPassword ? "hide the password" : "display the password"}
                    onClick={props.handleClickShowPassword}
                  ></IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{props.commentPW}</FormHelperText>
          </div>
        </div>
        <div className="input-form">
          <InputLabel>비밀번호 재확인 </InputLabel>
          <div>
            <OutlinedInput
              aria-describedby="outlined-weight-helper-text"
              required
              id="signup_Rpwd"
              type={props.showRePassword ? "text" : "password"}
              onChange={handleChangeRPW}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={props.showRePassword ? "hide the password" : "display the password"}
                    onClick={props.handleClickShowRePassword}
                  ></IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{props.commentRPW}</FormHelperText>
          </div>
        </div>
        <div className="input-form">
          <InputLabel>이메일 </InputLabel>
          <div>
            <OutlinedInput
              id="signup_email"
              aria-describedby="outlined-weight-helper-text"
              defaultValue={userinfo.email}
              required
              onChange={handleChangeEmail}
            />
            <FormHelperText>{props.commentEmail}</FormHelperText>
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
          {props.emailchange == 0 ? (
            <Button variant="contained" disabled>
              인증메일 받기
            </Button>
          ) : (
            <Button variant="contained" onClick={handleClickEamilAuth}>
              인증메일 받기
            </Button>
          )}
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            onChange={handleChangeInputAuth}
          ></TextField>
          {props.emailauth == 0 ? (
            <Button variant="contained" disabled>
              인증요청
            </Button>
          ) : (
            <Button variant="contained" onClick={handleCheckEamilAuth}>
              인증요청
            </Button>
          )}
        </div>

        <div className="input-form">
          <InputLabel>전화번호 </InputLabel>
          <div>
            <OutlinedInput
              id="signup_email"
              aria-describedby="outlined-weight-helper-text"
              defaultValue={userinfo.tel}
              required
              onChange={handleChangeTel}
            />
            <FormHelperText>{}</FormHelperText>
          </div>
          {props.telchange == 0 ? (
            <Button variant="contained" disabled>
              휴대폰 인증
            </Button>
          ) : (
            <Button variant="contained" onClick={handlerAuthTelEvent}>
              휴대폰 인증
            </Button>
          )}
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            onChange={(e) => {
              setSMSInput(e.target.value)
            }}
          ></TextField>
          {sendsms == 0 ? (
            <Button variant="contained" disabled>
              인증요청
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSMSAuth}>
              인증요청
            </Button>
          )}
        </div>

        <Button
          variant="outlined"
          onClick={() => {
            navigate("/main")
          }}
        >
          취소
        </Button>

        <Button variant="contained" onClick={handlerSaveEvent}>
          수정
        </Button>
      </>
    )
  }
}
const Leftbtn = {
  fontSize: "1.3rem",
  align: "center",
  textDecoration: "none",
  padding: "20px",
  display: "flex",
}
export { User, UserMenu }
