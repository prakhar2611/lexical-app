//not using for now
import { createSlice } from '@reduxjs/toolkit'
import { getdocs } from '../../apis/DocsApi'
import axios from 'axios'

const treeData = [
    {
      title: 'Welcome',
      children: [
        {
          title: 'How To Use',
          meta : '',
          isLeaf: true,
          disable : true
        },
        {
          title: 'About Us',
          meta : '',
          isLeaf: true,
        },
        {
            title: 'Use Me !',
            meta : '',
            isLeaf : true
        }
      ],
    }
]

export const directorySlice = createSlice({
  name: 'editor',
  initialState: {
    value: {
      tree :treeData ,
      folderList : [ ]
    }
  },
  reducers: {
    setdirectory: (state, action) => {
    console.log("on click" ,action.payload)
    state.value.tree = action.payload
    },

    updatedirectory: (state, action) => {
        state.value.tree =[...action.payload]
        const folders = []
        state.value.tree.forEach(element => {
        const value = {
          value : element.title,
          label : element.title
        }

        folders.push(value)
        console.log(folders)

        });
        state.value.folderList = folders
        }
  },
})

// Action creators are generated for each case reducer function
export const { setdirectory,updatedirectory } = directorySlice.actions

export default directorySlice.reducer