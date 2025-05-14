// store/slices/commonSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  code: null,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommonCode(state, action) {
      state.code = action.payload
    },
  },
})

export const { setCommonCode } = commonSlice.actions
export default commonSlice.reducer
