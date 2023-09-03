
import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    value: {
        editable : false ,
        onselectEditable : false
    }
  },
  reducers: {
    seteditable (state,action){
        state.value.editable = action.payload
    },
    setonselectEditable(state,action){
        state.value.onselectEditable = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { seteditable,setonselectEditable } = editorSlice.actions

export default editorSlice.reducer