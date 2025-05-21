import Box from "@mui/material/Box"
import { ThemeProvider } from "@mui/material/styles"
import { selectUserVodList } from "@/api/admin"
import { selectUser } from "@/store/selectors"
import { useSelector } from "react-redux"
import { NavLink } from "react-router"
import { useState } from "react"
import { useEffect } from "react"

let userid = ""

function DvdMenu() {
  let state = useSelector(selectUser)
  userid = state.info.userId

  return (
    <NavLink id="basic-button" to="/mypage/dvd/total" css={Leftbtn}>
      전체
    </NavLink>
  )
}

function Dvd() {
  //DB목록 부르기
  const [list, setlist] = useState([])

  useEffect(() => {
    const selectUserDvdList = async () => {
      selectUserVodList({ id: userid }).then((res) => {
        console.log(res.data)
        setlist(res.data)
      })
    }
    selectUserDvdList()
  }, [])

  return (
    <div>
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#fffcd8",
              dark: "#fffac3",
            },
          },
        }}
      >
        {list.map((value, index) => {
          return (
            <Box
              sx={{
                width: 400,
                height: 150,
                borderRadius: 1,
                margin: "10px",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}

              //onClick={() => {}}
            >
              <div className="input-form">
                <img src={value.poster} alt="picture1" height="150px" width="200px" />
                <span>
                  영화명: {value.movieName} <br />
                  감독: {value.directorA}
                  <br />
                  배우: {value.actorA} {value.actorB}
                  {value.actorC}
                  <br />
                  시청일: {value.watchdate}
                  <br />
                  시청시간: {value.watchtime}
                </span>
              </div>
            </Box>
          )
        })}
      </ThemeProvider>
    </div>
  )
}

const Leftbtn = {
  fontSize: "1.3rem",
  align: "center",
}
export { Dvd, DvdMenu }
