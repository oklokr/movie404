import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"

function OrderListMenu(props) {
  function setSubpath_orderlist(e) {
    if (e.target.id == "orderlist") props.setSubpath_orderlist("1")
    else if (e.target.id == "payment") props.setSubpath_orderlist("2")
  }
  return (
    <>
      <Button
        id="orderlist"
        href="#order#orderlist"
        size="large"
        css={Leftbtn}
        onClick={setSubpath_orderlist}
      >
        결제내역
      </Button>
      <Button
        id="payment"
        href="#order#payment"
        size="large"
        css={Leftbtn}
        onClick={setSubpath_orderlist}
      >
        카드관리
      </Button>
    </>
  )
}
function OrderList() {
  return (
    <>
      <h1>결제내역</h1>
    </>
  )
}

function Payment() {
  return (
    <>
      <h1>카드관리</h1>
    </>
  )
}
const Leftbtn = {
  "font-size": "1.3rem",
  align: "center",
}
export { OrderList, Payment, OrderListMenu }
