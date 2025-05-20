// ModalContext.js
import { Alert, Box, Button, IconButton, Modal, Snackbar, Typography } from "@mui/material"
import { createContext, useContext, useState } from "react"
import { css } from "@emotion/react"
import CloseIcon from "@mui/icons-material/Close"
const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  // type: message, confirm
  const [modal, setModal] = useState({ open: false, title: "알림", content: null, type: "message" })
  const [alert, setAlert] = useState({ open: false, message: "", type: "info" })

  const openModal = ({ title = "알림", content = null, type = "message" }) =>
    setModal({ open: true, title, content, type })
  const closeModal = () => setModal({ open: false, title: null, content: null, type: "" })

  const showAlert = ({ message, type = "info" }) => {
    setAlert({ open: true, message, type })
    setTimeout(() => setAlert({ open: false, message: "", type: "info" }), 3000)
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "initial",
    boxShadow: 24,
    p: 4,
    padding: "20px",
  }

  const closeBtnStyle = css`
    position: absolute;
    top: 0;
    right: 0;

    svg {
      width: 32px;
      height: 32px;
    }
  `

  const btnWrapStyle = css`
    display: flex;
    justify-content: right;
    gap: 12px;
  `

  return (
    <ModalContext.Provider value={{ openModal, closeModal, showAlert }}>
      {children}
      <Modal open={modal.open} onClose={closeModal}>
        <Box sx={style}>
          <IconButton
            css={closeBtnStyle}
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modal.content}
          </Typography>
          <div className="btn-wrap" css={btnWrapStyle}>
            {modal.type === "confirm" ? (
              <>
                <Button variant="contained" size="medium">
                  확인
                </Button>
                <Button variant="outlined" size="medium" onClick={closeModal}>
                  취소
                </Button>
              </>
            ) : (
              <Button>확인</Button>
            )}
          </div>
        </Box>
      </Modal>
      <Snackbar open={alert.open} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
