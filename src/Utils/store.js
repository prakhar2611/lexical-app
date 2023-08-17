import { configureStore } from '@reduxjs/toolkit'
import contentReducer  from './Reducers/contentSlice'

export default configureStore({
  reducer: {
    content : contentReducer,
  },
})