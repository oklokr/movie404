// store/slices/commonSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  location: [],
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload
    },
  },
})

export const { setLocation } = commonSlice.actions
export default commonSlice.reducer
