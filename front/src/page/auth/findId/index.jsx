import { Button, InputLabel, TextField } from "@mui/material"
import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useState } from "react"

function findId() {
  const [radio, setRadio] = useState("email")
  const [active, setActive] = useState(0)
  const [commentTel, setCommentTel] = useState("휴대폰 번호를 입력해주세요.")

  function handleChange(e) {
    setRadio(e.target.value)
  }
  function handleChangeTel(e) {
    var val = e.target.value
    var length = val.length
    setActive(0)
    if (length == 14) {
      val = val.substring(0, length - 1)
      e.target.value = val
    }
    if (/^010-([0-9]{4})-([0-9]{4})$/.test(val)) {
      setActive(1)
    } else if (length == 9 && /^010-([0-9]{4})/.test(val) && val.indexOf("-", 7) != 8) {
      val = val.substring(0, 8) + "-" + val.substring(8, length)
      e.target.value = val
    } else if (length == 4 && /^010/.test(val) && val.indexOf("-") != 3) {
      val = val.substring(0, 3) + "-" + val.substring(3, length)
      e.target.value = val
    }
  }
  return (
    <>
      <h1> 아이디 찾기 </h1>
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
      <div>
        {radio === "email" ? (
          <>
            <InputLabel className="input-form">이메일 인증 </InputLabel>
            <TextField
              id="signup_id"
              aria-describedby="outlined-weight-helper-text"
              required
              //  helperText={}
              // onChange={}
            />
            <Button variant="contained">인증요청</Button>
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
            {active == 0 ? (
              <Button variant="contained" disabled>
                인증요청
              </Button>
            ) : (
              <Button variant="contained">인증요청</Button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default findId
