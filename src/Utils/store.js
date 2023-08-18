import { configureStore } from '@reduxjs/toolkit'
import contentReducer  from './Reducers/contentSlice'
import pageReducer  from './Reducers/pageSlice'


export default configureStore({
  reducer: {
    content : contentReducer,
    page : pageReducer
  },
})