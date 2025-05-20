import { Button } from "@mui/material"
import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { ThemeProvider } from "@mui/material/styles"
import { selectUserVodList } from "@/api/admin"
import { autoBatchEnhancer } from "@reduxjs/toolkit"
import { selectUser } from "@/store/selectors"
import { useSelector } from "react-redux"

let list = []
let userid = ""

function DvdMenu() {
  let state = useSelector(selectUser)
  userid = state.info.userId

  return (
    <Button id="basic-button" href="#dvd#list" size="large" css={Leftbtn}>
      전체
    </Button>
  )
}

const selectUserDvdList = () => {
  selectUserVodList({ id: userid }).then((res) => {
    console.log(res.data)
    list = res.data
  })
}

function Dvd() {
  //DB목록 부르기
  selectUserDvdList()

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
