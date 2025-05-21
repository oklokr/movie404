import { Modal, Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { usePopup } from "@/component/popupProvider"
import { css } from "@emotion/react"
import { useState, useEffect } from "react"

const popupBoxStyle = css`
  min-width: 800px;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 16px;
  transform: translate(-50%, -50%) scale(0.92);
  background: #fff;
  box-shadow: 0 8px 32px #0003;
  outline: none;
  opacity: 0;
  transition:
    opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  &.active {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  svg {
    width: 42px;
    height: 42px;
    color: #bbb;
  }
`

export default function PopupContainer() {
  const { popups, closePopup } = usePopup()
  const [activeIds, setActiveIds] = useState([])

  useEffect(() => {
    if (popups.length > 0) {
      const newIds = popups.map((p) => p.id)
      setTimeout(() => setActiveIds(newIds), 10)
    }
  }, [popups])

  return (
    <>
      {popups.map((popup) => (
        <Modal open={popup.open} key={popup.id} onClose={() => closePopup(popup.id)}>
          <Box css={popupBoxStyle} className={activeIds.includes(popup.id) ? "active" : ""}>
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => closePopup(popup.id)}
            >
              <CloseIcon />
            </IconButton>
            {typeof popup.content === "function"
              ? popup.content({ close: () => closePopup(popup.id) })
              : popup.content}
          </Box>
        </Modal>
      ))}
    </>
  )
}
