import { Button, InputLabel, TextField } from "@mui/material"
import { useState } from "react"

function TelPage() {
  // const [commentTel, setCommentTel] = useState("휴대폰번호를 입력해주세요")

  // function handleChangeTel(e) {
  //   var val = e.target.value
  //   var length = val.length
  //   if (length == 14) {
  //     val = val.substring(0, length - 1)
  //     e.target.value = val
  //   }
  //   if (/^010-([0-9]{4})-([0-9]{4})$/.test(val)) {
  //     console.log("오둥이")
  //   } else if (length == 9 && /^010-([0-9]{4})/.test(val) && val.indexOf("-", 7) != 8) {
  //     val = val.substring(0, 8) + "-" + val.substring(8, length)
  //     e.target.value = val
  //   } else if (length == 4 && /^010/.test(val) && val.indexOf("-") != 3) {
  //     val = val.substring(0, 3) + "-" + val.substring(3, length)
  //     e.target.value = val
  //   }
  // }

  return (
    <>
      <InputLabel className="input-form">휴대폰 인증 </InputLabel>
      <TextField
        id="signup_id"
        aria-describedby="outlined-weight-helper-text"
        required
        //helperText={commentTel}
        //onChange={handleChangeTel}
      />
      <Button variant="contained">인증요청</Button>
    </>
  )
}
export default TelPage()
