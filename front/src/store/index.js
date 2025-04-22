// store/index.js
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user"
import commonReducer from "./slices/common"

const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
  },
})

export default store
