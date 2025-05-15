import { selectUser } from "@/store/selectors"
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { useSelector } from "react-redux"

function UserSetMenu() {
  return (
    <Button id="basic-button" href="#set#user" size="large" css={Leftbtn}>
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
  let state = useSelector(selectUser)
  //console.log(state.info.userId)

  if (!state.info || state.info === null || state.info === undefined) {
    return <div>로딩</div>
  } else {
    const userinfo = {
      id: "",
      adult: "",
      savehistory: "",
      //terms: [],
    }
    userinfo.id = state.info.userId
    userinfo.adult = state.info.viewAdult
    userinfo.savehistory = state.info.saveHistory
    //userinfo.terms = state.info.terms

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

          <FormGroup>
            {userinfo.adult == "N" ? (
              <FormControlLabel control={<Checkbox />} label="성인 컨텐츠 노출" />
            ) : (
              <FormControlLabel control={<Checkbox defaultChecked />} label="성인 컨텐츠 노출" />
            )}
            {userinfo.savehistory == "N" ? (
              <FormControlLabel control={<Checkbox />} label="검색 기록 저장" />
            ) : (
              <FormControlLabel control={<Checkbox defaultChecked />} label="검색 기록 저장" />
            )}
          </FormGroup>
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
}
const cssWidth = { width: "100%" }

const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { UserSet, UserSetMenu }
