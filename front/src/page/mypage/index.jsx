import { Height, InsertEmoticon } from "@mui/icons-material"
import { Button, Grid, Menu } from "@mui/material"

function mypage() {
  return (
    <>
      <div>mypage</div>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }} css={container}>
          <Button
            id="basic-button"
            size="large"
            css={btn}

            //onClick={handleClick}
          >
            회원정보
          </Button>
          <Button
            id="basic-button"
            size="large"
            css={btn}

            //onClick={handleClick}
          >
            DVD 목록
          </Button>
          <Button
            href="#text-buttons"
            size="large"
            css={btn}

            //onClick={handleClick}
          >
            설정
          </Button>
          <Button
            href="#text-buttons"
            size="large"
            css={btn}

            //onClick={handleClick}
          >
            결제
          </Button>
          <Button
            href="#text-buttons"
            size="large"
            css={btn}

            //onClick={handleClick}
          >
            약관
          </Button>
        </Grid>

        <Grid size={{ xs: 6, md: 4 }}>
          <Button
            id="basic-button"
            size="large"
            //onClick={handleClick}
          >
            회원정보
          </Button>
        </Grid>

        <Grid size={{ xs: 6, md: 8 }}></Grid>
      </Grid>
    </>
  )
}

const container = { "align-content": "center", "border-style": "solid" }
const btn = {
  "font-size": "1.5rem",
  "padding-left": "30px",
  "padding-right": "30px",
  align: "center",
}
export default mypage
