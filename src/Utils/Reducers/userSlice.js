import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'User',
  initialState: {
    value:{ },
  reducers: {
    setUser: (state, action) => {
        console.log("user : ", action.payload)
    state.value = action.payload
    }
  },
}})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer