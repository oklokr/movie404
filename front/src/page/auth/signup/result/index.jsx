import { useLocation, useNavigate } from "react-router"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import logoImg from "@/assets/images/logo/logo2.png"
import Confetti from "react-confetti"
import { useEffect, useState } from "react"

function result() {
  const location = useLocation()
  const navigate = useNavigate()
  const [pieces, setPieces] = useState(200)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPieces(0)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div css={css}>
        <Confetti numberOfPieces={pieces} opacity={0.8} gravity={0.1}></Confetti>
        <Card sx={{ maxWidth: 500, minHeight: 500 }} css={css}>
          <CardActionArea sx={{ backgroundColor: "black" }}>
            <CardMedia component="img" height="300" image={logoImg} alt="logo" />
          </CardActionArea>

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ display: "flex", paddingTop: "20px" }}
              css={css}
            >
              <Typography variant="h5" sx={{ color: "grey", fontFamily: "fantasy" }}>
                [ 회원가입 성공! ]
              </Typography>
            </Typography>
            <Typography variant="h3" sx={{ color: "", justifySelf: "center", display: "flex" }}>
              {location.state}{" "}
              <Typography variant="h5" sx={{ paddingTop: "20px" }}>
                님 환영합니다:)
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "text.secondary", fontSize: "small", paddingTop: "30px" }}
            >
              로그인페이지로 이동하여 지금 바로 서비스를 이용해보세요!
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/login")
            }}
            sx={{ float: "right", margin: "10px" }}
          >
            로그인 페이지로 이동
          </Button>
        </Card>
      </div>
    </>
  )
}
const css = {
  justifyItems: "center",
}

export default result
