import { createSlice } from '@reduxjs/toolkit'

const newPage = {
  'title' : 'Create New File',
  'folder' : 'Provide Folder Name',
  'content' : '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Basic Template to follow While Creating File and Folder in the Systemm.","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"this is initial state of editor editor","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"Lets get started","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
}

export const pageSlice = createSlice({
  name: 'Page',
  initialState: {
    value:{
        'title' : 'Create New File',
        'folder' : 'Provide Folder Name',
        'content' : '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Basic Template to follow While Creating File and Folder in the Systemm.","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"this is initial state of editor editor","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"Lets get started","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    }},
  reducers: {
    setCurrPage: (state, action) => {
        // state.value.set(action.payload.title,action.payload.meta)
    //   state.value.content = action.payload.meta
    //   state.value.pageId = ''
    //   state.value.pageName = action.payload.title
    state.value.title = action.payload.Title
    state.value.content = action.payload.MetaData

    },
    setCurrFolder: (state, action) => {
      console.log("on click Page state =====> " ,action.payload)

      state.value.folder = action.payload

  },
    setNewPage : (state,action) => {
      state.value = newPage

    }

    // setCurrPageName: (state, action) => {
    //   state.value.title = action.payload
    // }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrPage,setNewPage, setCurrFolder } = pageSlice.actions

export default pageSlice.reducer