import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { selectOrderList } from "@/api/admin"
import { selectUser } from "@/store/selectors"
import { useSelector } from "react-redux"

let userid = ""
function OrderListMenu(props) {
  let state = useSelector(selectUser)
  userid = state.info.userId

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
let list = []

const selectorderlist = () => {
  selectOrderList({ id: userid }).then((res) => {
    if (res.code === 200) {
      console.log(res.data)
      list = res.data
    }
  })
}
function OrderList() {
  selectorderlist()
  return (
    <>
      <h1>결제내역</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>주문번호</TableCell>
              <TableCell align="right">주문일자</TableCell>
              <TableCell align="right">영화명</TableCell>
              <TableCell align="right">구매가격</TableCell>
              <TableCell align="right">결제카드</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((value) => (
              <TableRow key={value.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {value.orderCode}
                </TableCell>
                <TableCell align="right">{value.orderDate}</TableCell>
                <TableCell align="right">{value.movieName}</TableCell>
                <TableCell align="right">{value.price}</TableCell>
                <TableCell align="right">{value.cardNum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  fontSize: "1.3rem",
  align: "center",
}
export { OrderList, Payment, OrderListMenu }
