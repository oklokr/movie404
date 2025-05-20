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
import { ModalProvider } from "@/component/modalProvider"
import { SearchProvider } from "@/component/searchProvider"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const Loading = () => <div>로딩중.</div>

const AppLoader = () => {
  const { ready } = useCommon()
  return ready ? <RouterProvider router={router} /> : <Loading />
}

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <CommonProvider>
        <ModalProvider>
          <SearchProvider>
            <AppLoader />
          </SearchProvider>
        </ModalProvider>
      </CommonProvider>
    </Provider>
  </Suspense>,
  // <StrictMode>
  // </StrictMode>,
)
