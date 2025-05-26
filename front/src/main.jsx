import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import "@/locales/i18n"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/assets/css/common.scss"
import { RouterProvider } from "react-router"
import { router } from "@/routes"
import { Provider } from "react-redux"
import store from "./store"
import { CommonProvider, useCommon } from "@/store/commonContext"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Box, CircularProgress, Typography } from "@mui/material"

const Loading = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#222",
      color: "#fff",
    }}
  >
    <CircularProgress color="inherit" />
    <Typography sx={{ mt: 2 }}>로딩중입니다...</Typography>
  </Box>
)

const AppLoader = () => {
  const { ready } = useCommon()
  return ready ? <RouterProvider router={router} /> : <Loading />
}

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <CommonProvider>
        <AppLoader />
      </CommonProvider>
    </Provider>
  </Suspense>,
  // <StrictMode>
  // </StrictMode>,
)
