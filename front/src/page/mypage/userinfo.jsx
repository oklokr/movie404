import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"

function UserMenu() {
  return (
    <Button id="basic-button" href="#basic#user" size="large" css={Leftbtn}>
      기본정보
    </Button>
  )
}
function User() {
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
      <div className="input-form">
        <InputLabel>아이디 </InputLabel>
        <TextField
          disabled
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          defaultValue="userID"
        />
      </div>
      <div className="input-form">
        <InputLabel>비밀번호 </InputLabel>

        <div>
          <OutlinedInput
            aria-describedby="outlined-weight-helper-text"
            required
            id="signup_pwd"
            //type={showPassword ? "text" : "password"}
            //onChange={handleChangePW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                //  aria-label={showPassword ? "hide the password" : "display the password"}
                // onClick={handleClickShowPassword}
                ></IconButton>
              </InputAdornment>
            }
            //helperText={}
            //onChange={}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>비밀번호 재확인 </InputLabel>
        <div>
          <OutlinedInput
            aria-describedby="outlined-weight-helper-text"
            required
            id="signup_Rpwd"
            //type={showRePassword ? "text" : "password"}
            //onChange={handleChangeRPW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                //aria-label={showRePassword ? "hide the password" : "display the password"}
                //onClick={handleClickShowRePassword}
                ></IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{}</FormHelperText>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>이메일 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            //onChange={handleChangeEmail}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            //onChange={handleSelectEmail}
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
        <Button variant="contained" disabled>
          인증메일 받기
        </Button>
      </div>
      <div>
        <TextField id="outlined-select-currency-native"></TextField>
      </div>

      <div className="input-form">
        <InputLabel>전화번호 </InputLabel>
        <div>
          <OutlinedInput
            id="signup_email"
            aria-describedby="outlined-weight-helper-text"
            required
            //onChange={handleChangeEmail}
          />
          <FormHelperText>{}</FormHelperText>
        </div>
        <Button variant="contained" disabled>
          인증메일 받기
        </Button>
      </div>

      <Button variant="contained">수정</Button>
    </>
  )
}
const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { User, UserMenu }
