// src/component/popup/PopupContainer.jsx
import { Modal, Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { usePopup } from "@/component/popupProvider"

export default function PopupContainer() {
  const { popups, closePopup } = usePopup()
  return (
    <>
      {popups.map((popup) => (
        <Modal open={popup.open} key={popup.id} onClose={() => closePopup(popup.id)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: 320,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: "none",
            }}
          >
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
