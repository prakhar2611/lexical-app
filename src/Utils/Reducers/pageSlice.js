import { createSlice } from '@reduxjs/toolkit'



export const pageSlice = createSlice({
  name: 'Page',
  initialState: {
    value:{
        'title' : 'Create New File',
        'folder' : '',
        'content' : '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Knots","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A simple editor with minimal feature to wrap your ideas.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Knots is written upon lexical (meta editor with react support) upon which it has to edit, update, create and view functionality. ","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"User and Create new File by clicking on the ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"(+) ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"on the folder directory. On which It will open a default page to edit. On saving the current editor content (by clicking on save on the right side of the tool bar ), user will be asked to provide file and folder name to save. The page will auto load on save and they will be able to see the file on the directory.","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"Feel free to use and provide Feedback on : ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"teencross@gmail.com","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Thanks !","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
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