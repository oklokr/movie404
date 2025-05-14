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
//useEffect(() => {}, [btn])
function menuClick(e) {
  alert(e.target.id)
  btn = 2
  return btn
}
function OrderListMenu() {
  return (
    <>
      <Button
        id="orderlist"
        href="#basic#user"
        size="large"
        css={Leftbtn}
        onClick={(e) => {
          return 0
        }}
      >
        결제내역
      </Button>
      <Button id="payment" href="#basic#user" size="large" css={Leftbtn} onClick={menuClick}>
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
