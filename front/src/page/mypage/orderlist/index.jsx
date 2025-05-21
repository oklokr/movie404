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
import { authUser, authVerify, selectOrderList } from "@/api/admin"
import { selectUser } from "@/store/selectors"
import { useSelector } from "react-redux"
import * as PortOne from "@portone/browser-sdk/v2"
import header from "@/layout/header"
import { NavLink } from "react-router"
import { useEffect, useState } from "react"

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
      <NavLink
        id="orderlist"
        to="/mypage/order/orderlist"
        css={Leftbtn}
        onClick={setSubpath_orderlist}
      >
        결제내역
      </NavLink>
      <NavLink id="payment" to="/mypage/order/payment" css={Leftbtn} onClick={setSubpath_orderlist}>
        카드관리
      </NavLink>
    </>
  )
}

function OrderList() {
  const [list, setlist] = useState([])

  useEffect(() => {
    const selectorderlist = async () => {
      selectOrderList({ id: userid }).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
          setlist(res.data)
        }
      })
    }
    selectorderlist()
  }, [])

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
function requestIssueBillingKey() {
  PortOne.requestIssueBillingKey({
    storeId: "store-56e4a946-8aac-456d-a3f9-5d7749040500", // 고객사 storeId로 변경해주세요.
    channelKey: "channel-key-b703b5fa-ca19-4e5e-91d6-a2ba75a95574", // 콘솔 결제 연동 화면에서 채널 연동 시 생성된 채널 키를 입력해주세요.
    billingKeyMethod: "CARD",
    issueId: "test-issueId",
    issueName: "test-issueName",
    customer: {
      fullName: "포트원",
      phoneNumber: "010-0000-1234",
      email: "test@portone.io",
    },
  })
}

function requestPayment() {
  PortOne.requestPayment({
    storeId: "store-56e4a946-8aac-456d-a3f9-5d7749040500", // 고객사 storeId로 변경해주세요.
    channelKey: "channel-key-b703b5fa-ca19-4e5e-91d6-a2ba75a95574", // 콘솔 결제 연동 화면에서 채널 연동 시 생성된 채널 키를 입력해주세요.
    paymentId: `payment${crypto.randomUUID()}`,
    orderName: "나이키 와플 트레이너 2 SD",
    totalAmount: 1000,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
    customer: {
      fullName: "포트원",
      phoneNumber: "010-0000-1234",
      email: "test@portone.io",
    },
  })
}
/*const PORTONE_API_SECRET =
  "HAScg24us1bOISHDyTXYY3IWugf79CESXMqOWAOWl5ZX5tvR6jrIrDNtbWkaL8pnAaw6qSYLX3vSym71"
const identityVerification = `identity-verification-${crypto.randomUUID()}`

async function test() {
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
    }
    fetch({
      url: `https://api.portone.io/identity-verifications/${identityVerification}`,
      headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` },
    }).then((response) => {
      console.log(response.json.verifiedCustomer)
    })
  })
}*/
function Payment() {
  // test()
  //requestPayment()
  //requestIssueBillingKey()
  return (
    <>
      <h1>카드관리</h1>
    </>
  )
}
const Leftbtn = {
  fontSize: "1.3rem",
  align: "center",
  textDecoration: "none",
}
export { OrderList, Payment, OrderListMenu }
