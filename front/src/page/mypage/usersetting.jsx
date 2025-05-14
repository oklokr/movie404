import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"

function UserSetMenu() {
  return (
    <Button id="basic-button" href="#basic#user" size="large" css={Leftbtn}>
      기본설정
    </Button>
  )
}
function UserSet() {
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
      <h1>기본설정</h1>
    </>
  )
}
const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { UserSet, UserSetMenu }
