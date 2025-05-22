import { Button } from "@mui/material"
import { css } from "@emotion/react"
import { orderCreateId, orderValidate } from "@/api/order"
import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors"
import { useModal } from "@/component/modalProvider"
import { usePopup } from "@/component/popupProvider"
import { useNavigate } from "react-router"

export default function popMovieDetail(props) {
  const user = useSelector(selectUser)
  const { popups, closePopup } = usePopup()
  const { openModal, showAlert, closeModal } = useModal()
  const navigate = useNavigate()

  const handlePayment = async () => {
    try {
      const userId = user.info.userId
      const movieCode = props.targetItem.movieCode
      const price = props.targetItem.dvdPrice || 100

      const createRes = await orderCreateId({ userId, movieCode, price })
      const { orderCode } = createRes.data

      const { IMP } = window
      IMP.init("imp36514004")

      IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: orderCode,
          name: props.targetItem.movieName,
          amount: price,
          buyer_email: user.info.email || "",
          buyer_name: user.info.userName,
        },
        async (res) => {
          console.log(res)
          if (res.success) {
            // 3. 결제 성공 → 백엔드에 검증 요청
            const validateRes = await orderValidate({ orderCode: orderCode, impUid: res.imp_uid })
            openModal({
              content: "결제가 완료되었습니다!",
              fn: () => {
                closePopup()
                navigate("/mypage")
              },
            })
            console.log(validateRes.data)
          } else {
            openModal({ content: res.error_msg, fn: closeModal })
          }
        },
      )
    } catch (error) {
      openModal({ cotnent: "결제 처리 중 오류가 발생했습니다." })
    }
  }
  return (
    <>
      <div css={topContentStyle}>
        {props.targetItem.teaser != null ? (
          <iframe
            width="100%"
            height="100%"
            src={props.targetItem.teaser}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        ) : (
          <span>
            <img src={props.targetItem.background} alt={props.targetItem.movieName} />
          </span>
        )}
      </div>
      <ul css={genreListStyle}>
        {props.genreList.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <dl css={infoStyle}>
        <dt>{props.targetItem.movieName}</dt>
        <dd>{props.targetItem.synopsis}</dd>
      </dl>
      <div css={btnWrapStyle}>
        <Button variant="contained" size="large" onClick={handlePayment}>
          DVD구매하기
        </Button>
        <Button variant="contained" size="large">
          영화 예매하기
        </Button>
      </div>
    </>
  )
}
const topContentStyle = css`
  margin: -32px -32px 0 -32px;
  height: 500px;

  span,
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`
const genreListStyle = css`
  display: flex;
  list-style: none;
  gap: 8px;
  padding: 0;
  margin: 20px 0 0;

  li {
    font-size: 14px;
    padding: 2px 8px;
    border-radous: 12px;
    background: #ddd;
  }
`
const infoStyle = css`
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  dt {
    font-weight: bold;
  }

  dd {
    margin: 8px 0 0 0;
  }
`
const btnWrapStyle = css`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  margin-top: 20px;
`
