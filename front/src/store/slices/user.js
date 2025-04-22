import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  info: null,
  language: "en",
}

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    // 더미 데이터
    return {
      info: { username: "JohnDoe", userTpcd: 0, shopUseFlag: "1" },
      language: "en",
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.info = action.payload.info
      state.language = action.payload.language
    })
  },
})

export const { setLanguage } = userSlice.actions
export default userSlice.reducer
