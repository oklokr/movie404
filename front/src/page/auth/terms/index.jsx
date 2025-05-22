import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import { signupTerms } from "@/api/signup"
import { useModal } from "@/component/modalProvider"

const { showAlert } = useModal()
//let list=[]
function terms() {
  const [list, setlist] = useState([])
  const [TermA, setTermA] = useState("")
  const [TermB, setTermB] = useState("")
  const [TermC, setTermC] = useState("")

  useEffect(() => {
    const getTerms = async () => {
      await signupTerms().then((res) => {
        setlist(res.data)
      })
    }
    getTerms()
  }, [])

  function handleTermA(e) {
    if (e.target.value == "0") {
      showAlert({
        message: "필수약관으로 동의하지 않으시면 서비스 이용이 불가합니다.",
        type: "error",
      })
    }
    setTermA(e.target.value)
  }
  function handleTermB(e) {
    if (e.target.value == "0") {
      showAlert({
        message: "필수약관으로 동의하지 않으시면 서비스 이용이 불가합니다.",
        type: "error",
      })
    }
    setTermB(e.target.value)
  }
  function handleTermC(e) {
    setTermC(e.target.value)
  }

  function nextbutton(e) {
    if (TermA == "1" && TermB == "1" && TermC != "") {
      showAlert({
        message: "다음으로 넘어갑니다.",
        type: "confirm",
      })
      navigate("/signup", { state: { terms: TermA + TermB + TermC } })
    } else if (TermC == "") {
      showAlert({
        message: "모든 약관을 확인하시고 동의여부를 클릭해주세요.",
        type: "error",
      })
    } else {
      showAlert({
        message: "필수약관으로 동의하지 않으시면 서비스 이용이 불가합니다.",
        type: "error",
      })
    }
  }
  const navigate = useNavigate()

  function previousPage(e) {
    navigate("/main")
  }

  return (
    <>
      {list.map((value, index) => (
        <div key={index}>
          <Accordion defaultExpanded={index == 0 ? true : false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{value.termsTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{value.termsContent}</Typography>
            </AccordionDetails>
          </Accordion>

          <FormControl css={cssWidth}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              css={cssJust}
              onChange={index == 0 ? handleTermA : index == 1 ? handleTermB : handleTermC}
            >
              <FormControlLabel value="0" control={<Radio />} label="동의하지 않음" />
              <FormControlLabel value="1" control={<Radio />} label="동의함" />
            </RadioGroup>
          </FormControl>
        </div>
      ))}
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

const cssJust = { justifyContent: "right" }
const cssWidth = { width: "100%" }
const cssAlign = { float: "right" }

export default terms
