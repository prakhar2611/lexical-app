import { createSlice } from '@reduxjs/toolkit'

export const toSaveContentSlice = createSlice({
  name: 'tosavecontent',
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
    setSave: (state, action) => {
      state.value = action.payload
      console.log("on save to db state ======" ,state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSave } = toSaveContentSlice.actions

export default toSaveContentSlice.reducer