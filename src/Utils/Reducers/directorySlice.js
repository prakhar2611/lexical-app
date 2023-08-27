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
    value: treeData
  },
  reducers: {
    setdirectory: (state, action) => {
    console.log("on click" ,action.payload)
    state.value = action.payload
    },

    updatedirectory: (state, action) => {
        state.value=[...action.payload]
        }
  },
})

// Action creators are generated for each case reducer function
export const { setdirectory,updatedirectory } = directorySlice.actions

export default directorySlice.reducer