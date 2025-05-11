import { Button, InputLabel, TextField } from "@mui/material"

function TelPage() {
  return (
    <>
      <InputLabel className="input-form">휴대폰 인증 </InputLabel>
      <TextField
        id="signup_id"
        aria-describedby="outlined-weight-helper-text"
        required
        //  helperText={}
        // onChange={}
      />
      <Button variant="contained">인증요청</Button>
    </>
  )
}
export default TelPage()
