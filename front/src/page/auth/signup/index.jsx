import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useState } from "react"
import { InputLabel } from "@mui/material"

const test = {
  color: "black",
}
function signup() {
  const [test2, setTest2] = useState("아이디를 입력해주세요")

  function handleChange(e) {
    const val = e.target.value
    if (val === "") setTest2("ㅇㅇ")
  }
  return (
    <>
      <h1 style={test}> 정보 입력 </h1>

      <div>
        <InputLabel className="input-form--col">아이디 </InputLabel>
        <TextField
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          required
          helperText={test2}
          onChange={handleChange}
        />
        <Button variant="contained">중복확인</Button>
      </div>
      <div>
        <InputLabel>비밀번호 </InputLabel>
        <OutlinedInput
          id="signup_pwd"
          aria-describedby="outlined-weight-helper-text"
          required
        />
      </div>

      <div>
        <InputLabel>비밀번호 확인 </InputLabel>
        <OutlinedInput
          id="signup_repwd"
          aria-describedby="outlined-weight-helper-text"
          required
        />
      </div>
      <div>
        <InputLabel>이메일 </InputLabel>
        <OutlinedInput
          id="signup_email"
          aria-describedby="outlined-weight-helper-text"
          required
        />
      </div>
      <div>
        <InputLabel>전화번호 </InputLabel>
        <OutlinedInput
          id="signup_tel"
          aria-describedby="outlined-weight-helper-text"
          required
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
