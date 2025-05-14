import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  info: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.info = action.payload
    },
    resetUserInfo(state) {
      state.info = null
    },
  },
})

export const { setUserInfo, resetUserInfo } = userSlice.actions
export default userSlice.reducer
