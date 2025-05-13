import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { useState } from "react"

import { Button } from "@mui/material"
import { useNavigate } from "react-router"

function terms() {
  const [TermA, setTermA] = useState("")
  const [TermB, setTermB] = useState("")
  const [TermC, setTermC] = useState("0")

  function handleTermA(e) {
    if (e.target.value == "0") {
      alert("필수약관으로 동의하지 않으시면 서비스 이용이 불가합니다.")
    }
    setTermA(e.target.value)
  }
  function handleTermB(e) {
    if (e.target.value == "0") {
      alert("필수약관으로 동의하지 않으시면 서비스 이용이 불가합니다.")
    }
    setTermB(e.target.value)
  }
  function handleTermC(e) {
    setTermC(e.target.value)
  }

  function nextbutton(e) {
    if (TermA == "1" && TermB == "1") {
      alert("다음으로 넘어갑니다.")
      navigate("/signup", { state: { terms: TermA + TermB + TermC } })
    } else {
      alert("필수약관을 모두 동의하지 않으시면 서비스 이용이 불가합니다.")
    }
  }
  const navigate = useNavigate()

  function previousPage(e) {
    navigate("/main")
  }
  return (
    <>
      <div>약관동의</div>
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">서비스이용약관(필수)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              제1조(목적) 이 약관은 "NOT404" 회사(전자상거래 사업자)가 운영하는 "NOT404CINEMA"
              사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를
              이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
              제2조(정의) ① “몰”이란 OO 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게
              제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한
              가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. ②
              “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및
              비회원을 말합니다. ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이
              제공하는 서비스를 이용할 수 있는 자를 말합니다. 제3조 (약관 등의 명시와 설명 및 개정)
              ① “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
              청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의
              연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. ② “몰”이 약관을
              개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에
              이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을
              체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의
              공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
              제4조(서비스의 제공 및 변경) ① “몰”은 다음과 같은 업무를 수행합니다. 1. 재화 또는
              용역에 대한 정보 제공 및 구매계약의 체결 2. 구매계약이 체결된 재화 또는 용역의 배송 3.
              기타 “몰”이 정하는 업무② “몰”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을
              재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게
              통지 가능한 주소로 즉시 통지합니다. ③ 전항의 경우 “몰”은 이로 인하여 이용자가 입은
              손해를 배상합니다. 다만, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
              아니합니다. 제5조(서비스의 중단) ① “몰”은 컴퓨터 등 정보통신설비의 보수점검․교체 및
              고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
              있습니다. 제6조(회원가입) ① 이용자는 “몰”이 정한 가입 양식에 따라 회원정보를 기입한 후
              이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. 제7조(회원 탈퇴 및
              자격 상실 등) ① 회원은 “몰”에 언제든지 탈퇴를 요청할 수 있으며 “몰”은 즉시 회원탈퇴를
              처리합니다. ② 회원이 다음 각 호의 사유에 해당하는 경우, “몰”은 회원자격을 제한 및
              정지시킬 수 있습니다. 1. 가입 신청 시에 허위 내용을 등록한 경우 제8조(회원에 대한
              통지) ① “몰”이 회원에 대한 통지를 하는 경우, 회원이 “몰”과 미리 약정하여 지정한
              전자우편 주소로 할 수 있습니다. ② “몰”은 불특정다수 회원에 대한 통지의 경우 1주일이상
              “몰” 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와
              관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다. 제9조(구매신청 및
              개인정보 제공 동의 등) ① “몰”이용자는 “몰”상에서 다음 또는 이와 유사한 방법에 의하여
              구매를 신청하며, “몰”은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게
              제공하여야 합니다. 1. 재화 등의 검색 및 선택 2. 받는 사람의 성명, 주소, 전화번호,
              전자우편주소(또는 이동전화번호) 등의 입력 제11조(지급방법) “몰”에서 구매한 재화 또는
              용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다. 단,
              “몰”은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여
              징수할 수 없습니다. 1. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
            </Typography>
          </AccordionDetails>
        </Accordion>

        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssJust}
            onChange={handleTermA}
          >
            <FormControlLabel value="0" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="1" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">개인정보처리방침(필수)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              제17조(개인정보보호) ① “몰”은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한
              범위에서 최소한의 개인정보를 수집합니다. ② “몰”은 회원가입시 구매계약이행에 필요한
              정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에
              본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지
              아니합니다. ③ “몰”은 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그
              목적을 고지하고 동의를 받습니다. ④ “몰”은 수집된 개인정보를 목적외의 용도로 이용할 수
              없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는
              이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련
              법령에 달리 정함이 있는 경우에는 예외로 합니다. ⑤ “몰”이 제2항과 제3항에 의해 이용자의
              동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타
              연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자,
              제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」
              제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를
              철회할 수 있습니다. ⑥ 이용자는 언제든지 “몰”이 가지고 있는 자신의 개인정보에 대해 열람
              및 오류정정을 요구할 수 있으며 “몰”은 이에 대해 지체 없이 필요한 조치를 취할 의무를
              집니다. 이용자가 오류의 정정을 요구한 경우에는 “몰”은 그 오류를 정정할 때까지 당해
              개인정보를 이용하지 않습니다. ⑦ “몰”은 개인정보 보호를 위하여 이용자의 개인정보를
              취급하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의
              개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에
              대하여 모든 책임을 집니다. ⑧ “몰” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의
              수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다. ⑨
              “몰”은 개인정보의 수집·이용·제공에 관한 동의 란을 미리 선택한 것으로 설정해두지
              않습니다. 또한 개인정보의 수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를
              구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집·이용·제공에 관한 이용자의
              동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.
              제18조(“몰“의 의무) ① “몰”은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
              않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화․용역을 제공하는데 최선을
              다하여야 합니다. ② “몰”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의
              개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다. ③ “몰”이 상품이나
              용역에 대하여 「표시․광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시․광고행위를
              함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다. ④ “몰”은 이용자가
              원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다. 제19조(회원의 ID 및
              비밀번호에 대한 의무) ① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은
              회원에게 있습니다. ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는
              안됩니다. ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한
              경우에는 바로 “몰”에 통보하고 “몰”의 안내가 있는 경우에는 그에 따라야 합니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssJust}
            onChange={handleTermB}
          >
            <FormControlLabel value="0" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="1" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">마케팅약관(선택)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              해당 약관에 동의할 경우 오둥이 빵 gs25 출시와 같은 최신 오둥이 정보를 제공받으실 수
              있습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssJust}
            onChange={handleTermC}
          >
            <FormControlLabel value="0" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="1" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Button css={cssAlign} variant="contained" onClick={nextbutton}>
          다음
        </Button>
        <Button css={cssAlign} variant="outlined" onClick={previousPage}>
          취소
        </Button>
      </div>
    </>
  )
}

const cssJust = { "justify-content": "right" }
const cssWidth = { width: "100%" }
const cssAlign = { float: "right" }

export default terms
