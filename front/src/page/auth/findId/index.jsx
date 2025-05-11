import { Button, InputLabel, TextField } from "@mui/material"
import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useState } from "react"
import emailPage from "./by_email"
import telPage from "./by_tel"

function findId() {
  const [radio, setRadio] = useState("email")
  function handleChange(e) {
    setRadio(e.target.value)
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
      <div>{radio === "email" ? emailPage : telPage}</div>
    </>
  )
}

export default findId
