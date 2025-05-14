import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
var btn = 1
useEffect(() => {}, [btn])
function OrderListMenu() {
  return (
    <>
      <Button
        id="basic-button"
        href="#basic#user"
        size="large"
        css={Leftbtn}
        onClick={() => (btn = 1)}
      >
        결제내역
      </Button>
      <Button
        id="basic-button"
        href="#basic#user"
        size="large"
        css={Leftbtn}
        onClick={() => (btn = 2)}
      >
        카드관리
      </Button>
    </>
  )
}
function OrderList() {
  return <>{btn == 1 ? <h1>결제내역</h1> : <h1>카드관리</h1>}</>
}
const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { OrderList, OrderListMenu }
