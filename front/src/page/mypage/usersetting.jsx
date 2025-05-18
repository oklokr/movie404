import { updateUserSet, updateUserTerms } from "@/api/admin"
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
      lang: "",
      dateformat: "",
      savehistory: "",
    }
    const userchange = {
      id: "",
      adult: "",
      lang: "",
      dateformat: "",
      savehistory: "",
    }
    userinfo.id = state.info.userId
    userinfo.adult = state.info.viewAdult
    userinfo.lang = state.info.langTpcd
    userinfo.dateformat = state.info.dateTpcd
    userinfo.savehistory = state.info.saveHistory
    function SaveEventHandler(e) {
      if (userchange.adult != "") userinfo.adult = userchange.adult
      if (userchange.lang != "") userinfo.lang = userchange.lang
      if (userchange.dateformat != "") userinfo.dateformat = userchange.dateformat
      if (userchange.savehistory != "") userinfo.savehistory = userchange.savehistory
      alert(
        userinfo.adult +
          "//" +
          userinfo.lang +
          "//" +
          userinfo.dateformat +
          "//" +
          userinfo.savehistory,
      )
      updateSetting()
    }
    const updateSetting = () => {
      updateUserSet({
        id: userinfo.id,
        adult: userinfo.adult,
        lang: userinfo.lang,
        dateformat: userinfo.dateformat,
        savehistory: userinfo.savehistory,
      }).then((res) => {
        if (res.code === 200) {
          alert("수정 성공!")
        } else {
          alert("저장실패!")
        }
      })
    }
    function handleChangeLang(e) {
      if (e.target.value == "eng") userchange.lang = "1"
      else userchange.lang = "2"
    }
    function handleChangeDateFormat(e) {
      if (e.target.value == "YMD") userchange.dateformat = "1"
      else userchange.dateformat = "2"
    }
    function handleChangeAdult(e) {
      if (e.target.checked == true) {
        userchange.adult = "Y"
      } else userchange.adult = "N"
    }
    function handleChangeHistory(e) {
      if (e.target.checked == true) {
        userchange.savehistory = "Y"
      } else userchange.savehistory = "N"
    }
    return (
      <>
        <h1>기본설정</h1>
        <div className="input-form">
          <InputLabel>언어설정 </InputLabel>
          <div>
            <TextField
              id="outlined-select-currency-native"
              onChange={handleChangeLang}
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
              onChange={handleChangeDateFormat}
              defaultValue={userinfo.dateformat == "1" ? dateformat[0].label : dateformat[1].label}
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
              <FormControlLabel
                control={<Checkbox onClick={handleChangeAdult} />}
                label="성인 컨텐츠 노출"
              />
            ) : (
              <FormControlLabel
                control={<Checkbox defaultChecked onClick={handleChangeAdult} />}
                label="성인 컨텐츠 노출"
              />
            )}
            {userinfo.savehistory == "N" ? (
              <FormControlLabel
                control={<Checkbox onClick={handleChangeHistory} />}
                label="검색 기록 저장"
              />
            ) : (
              <FormControlLabel
                control={<Checkbox defaultChecked onClick={handleChangeHistory} />}
                label="검색 기록 저장"
              />
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
        <Button variant="contained" onClick={SaveEventHandler}>
          저장
        </Button>
      </>
    )
  }
}

const Leftbtn = {
  fontSize: "1.3rem",
  align: "center",
}
export { UserSet, UserSetMenu }
