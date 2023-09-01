import { createSlice } from '@reduxjs/toolkit'

export const onSavePageSlice = createSlice({
  name: 'tosavecontent',
  initialState: {
    value: {
        metaData : String,
        title : String,
        folder : String
    }
  },
  reducers: {
    setSave: (state, action) => {
      state.value.metaData = action.payload
      console.log("on save to db state ======" ,state.value)
    },

    setSaveTitle : (state,payload) => {
        state.value.title = action.payload
    },

    setSaveFolder : (state,payload) => {
        state.value.folder = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSave } = toSaveContentSlice.actions

export default toSaveContentSlice.reducer