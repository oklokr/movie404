import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
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
  const langformat = [
    {
      value: "kor",
      label: "한국어",
    },
    {
      value: "eng",
      label: "English",
    },
  ]

  const dateformat = [
    {
      value: "YMD",
      label: "YYYY-MM-DD",
    },
    {
      value: "DMY",
      label: "DD-MM-YYYY",
    },
  ]
  return (
    <>
      <h1>기본설정</h1>

      <div className="input-form">
        <InputLabel>언어설정 </InputLabel>
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
            {langformat.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>날짜설정 </InputLabel>
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
            {dateformat.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
      </div>
      <div className="input-form">
        <InputLabel>컨텐츠 </InputLabel>

        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="0" control={<Radio />} label="성인 컨텐츠 보기" />
            <FormControlLabel value="1" control={<Radio />} label="검색 기록 저장" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="input-form">
        <InputLabel>성인인증 </InputLabel>
        <TextField
          id="signup_id"
          aria-describedby="outlined-weight-helper-text"
          required
          //helperText={commentId}
          //onChange={handleChangeID}
        />
        <Button variant="contained">인증요청</Button>
      </div>

      <Button variant="contained">저장</Button>
    </>
  )
}
const cssWidth = { width: "100%" }

const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { UserSet, UserSetMenu }
