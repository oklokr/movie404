import { useLocation, useNavigate } from "react-router"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import logoImg from "@/assets/images/logo/logo2.png"

function resultPw() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <div css={css}>
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
                [ 임시 비밀번호 ]
              </Typography>
            </Typography>
            <Typography variant="h3" sx={{ color: "", justifySelf: "center" }}>
              {location.state}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "text.secondary", fontSize: "small", paddingTop: "30px" }}
            >
              *마이페이지에서 반드시 비밀번호를 변경해주세요.
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
            로그인
          </Button>
        </Card>
      </div>
    </>
  )
}
const css = {
  justifyItems: "center",
}

export default resultPw
