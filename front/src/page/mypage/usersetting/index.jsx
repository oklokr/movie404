import { updateUserSet } from "@/api/admin"
import { selectUser } from "@/store/selectors"
import { Button, Checkbox, FormControlLabel, FormGroup, InputLabel, TextField } from "@mui/material"
import PortOne from "@portone/browser-sdk/v2"
import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router"

function UserSetMenu() {
  return (
    <NavLink id="basic-button" to="/mypage/set/user" css={Leftbtn}>
      기본설정
    </NavLink>
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

  if (!state.info || state.info === null || state.info === undefined) {
    return <div>로딩</div>
  } else {
    const userinfo = {
      id: "",
      adult: "",
      lang: "",
      dateformat: "",
      savehistory: "",
      age: 0,
    }
    const userchange = {
      id: "",
      adult: "",
      lang: "",
      dateformat: "",
      savehistory: "",
      age: 0,
    }
    const [authadult, setAuthAdult] = useState(0)
    const [age, setAge] = useState(state.info.age)
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
      //setAge(userchange.age)
      alert(
        userinfo.adult +
          "//" +
          userinfo.lang +
          "//" +
          userinfo.dateformat +
          "//" +
          userinfo.savehistory +
          "//" +
          userinfo.age +
          "//" +
          userchange.age +
          "//" +
          age,
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
        age: age,
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
    function handlerAuthAdult(e) {
      const PORTONE_API_SECRET =
        "HAScg24us1bOISHDyTXYY3IWugf79CESXMqOWAOWl5ZX5tvR6jrIrDNtbWkaL8pnAaw6qSYLX3vSym71"
      const identityVerification = `identity-verification-${crypto.randomUUID()}`

      console.log("호출됨")
      PortOne.requestIdentityVerification({
        storeId: "store-56e4a946-8aac-456d-a3f9-5d7749040500",
        identityVerificationId: identityVerification,
        // 연동 정보 메뉴의 채널 관리 탭에서 확인 가능합니다.
        channelKey: "channel-key-33088424-0132-4b0d-b1fe-b1a8cfc8f071",
      }).then((res) => {
        console.log(encodeURIComponent(res.identityVerificationId))
        if (res.code !== undefined) {
          return alert(res.message)
        } else {
          setAuthAdult(1)
          setAge(23)
          alert("인증되었습니다!")
        }
      })
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
          {authadult == 1 || age >= 19 ? (
            <Button variant="contained" disabled>
              성인인증완료
            </Button>
          ) : (
            <Button variant="contained" onClick={handlerAuthAdult}>
              성인인증하기
            </Button>
          )}
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
  textDecoration: "none",
}
export { UserSet, UserSetMenu }
