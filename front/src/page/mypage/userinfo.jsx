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
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router"

function UserMenu() {
  return (
    <Button id="basic-button" href="#basic#user" size="large" css={Leftbtn}>
      기본정보
    </Button>
  )
}
function User(props) {
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

    function handleChangeEmail(e) {
      const val = e.target.value
      props.setEmail("")
      if (val === "") props.setCommentEmail("이메일을 입력해주세요")
      if (/[!@#$%^&*|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) props.setCommentEmail("특수문자/한글 포함 불가")
      if (val == userinfo.email) {
        props.setEmailEvent(0)
        props.setEmailAuth(0)
      } else {
        props.setEmailEvent(1)
      }
      props.setEmail(val)
    }

    function handleSelectEmail(e) {
      const val = e.target.value + ".com"
      if (val == userinfo.domain) {
        if (props.Email == userinfo.email) props.setEmailEvent(0)
        else {
          props.setEmailEvent(1)
          userinfo.domain = e.target.label
        }
        props.setEmailAuth(0)
      } else {
        props.setEmailEvent(1)
      }
    }

    function handleChangeTel(e) {
      // alert(props.test)
      if (e.target.value == userinfo.tel) props.setTelEvent(0)
      else props.setTelEvent(1)
    }
    function handleClickEamilAuth(e) {
      checkEmail()

      props.setEmailAuth(1)
    }
    function handleChangePW(e) {
      const val = e.target.value
      props.setPW(val)

      if (val === "") props.setCommentPW("비밀번호를 입력해주세요")
      else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(val)) props.setCommentPW("한글 포함 불가")
      else if (!/[!@#$%^&*]/.test(val)) props.setCommentPW("특수문자를 포함해주세요")
      else props.setCommentPW("비밀번호 입력 완료!")
    }
    function handleChangeRPW(e) {
      const val = e.target.value
      props.setRPW(val)

      if (val === "") props.setCommentRPW("비밀번호 재확인을 입력해주세요")
    }

    const checkEmail = () => {
      signupCheckEmail({
        email: props.Email + props.EmailFormat,
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          userinfo.email = props.Email + props.EmailFormat
          alert("사용 가능한 이메일 입니다.")
          //메일전송
          sendEmail()
        } else {
          alert("이미 등록된 이메일 입니다.")
        }
      })
    }

    const sendEmail = () => {
      sendAuthEmail({
        email: userinfo.email,
      }).then((res) => {
        if (res.code === 200) {
          alert("인증메일을 전송했습니다!")
          userinfo.authcode = res.data
          //setSendMail(1)
        }
      })
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
          <TextField id="outlined-select-currency-native"></TextField>
          {props.emailauth == 0 ? (
            <Button variant="contained" disabled>
              인증요청
            </Button>
          ) : (
            <Button variant="contained">인증요청</Button>
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
            <Button variant="contained">휴대폰 인증</Button>
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

        <Button variant="contained">수정</Button>
      </>
    )
  }
}
const Leftbtn = {
  fontSize: "1.3rem",
  align: "center",
}
export { User, UserMenu }
