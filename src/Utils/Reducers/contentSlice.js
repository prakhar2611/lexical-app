import { createSlice } from '@reduxjs/toolkit'

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    value: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfdsf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"this is initial state of editor editor","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dasds","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  },
  reducers: {
  //  start: (state,action) => {
  //   state.value = true
  //  },
  //   finished: (state, action) => {
  //     state.value = falses
  //   },
    setcontent: (state, action) => {
      state.value = action.payload
      console.log("on click change state ======" ,state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcontent } = contentSlice.actions

export default contentSlice.reducer