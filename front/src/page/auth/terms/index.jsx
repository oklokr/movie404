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

function terms() {
  const cssAlign = { "justify-content": "right" }
  const cssWidth = { width: "100%" }

  const [TermA, setTermA] = useState("")
  const [TermB, setTermB] = useState("")
  const [TermC, setTermC] = useState("")
  const [TermD, setTermD] = useState("")
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
            <Typography component="span">Expanded by default</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssAlign}
          >
            <FormControlLabel value="agree" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="disagree" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Header</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssAlign}
          >
            <FormControlLabel value="agree" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="disagree" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Header</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssAlign}
          >
            <FormControlLabel value="agree" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="disagree" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Header</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <FormControl css={cssWidth}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            css={cssAlign}
          >
            <FormControlLabel value="agree" control={<Radio />} label="동의하지 않음" />
            <FormControlLabel value="disagree" control={<Radio />} label="동의함" />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  )
}
export default terms
