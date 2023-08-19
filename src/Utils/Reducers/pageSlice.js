import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'Page',
  initialState: {
    value:{
        'title' : 'Create New',
        'content' : '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfdsf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"this is initial state of editor editor","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dasds","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    }},
  reducers: {
    setCurrPage: (state, action) => {
        // state.value.set(action.payload.title,action.payload.meta)
    //   state.value.content = action.payload.meta
    //   state.value.pageId = ''
    //   state.value.pageName = action.payload.title
    state.value.title = action.payload.title
    state.value.content = action.payload.meta
    // console.log("on click Page state =====> " ,state.value)

    },

    // setCurrPageName: (state, action) => {
    //   state.value.title = action.payload
    // }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrPage } = pageSlice.actions

export default pageSlice.reducer