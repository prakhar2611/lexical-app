import { configureStore } from '@reduxjs/toolkit'
import contentReducer  from './Reducers/contentSlice'
import pageReducer  from './Reducers/pageSlice'
import tosavecontentReducer from './Reducers/toSaveContentSlice'


export default configureStore({
  reducer: {
    content : contentReducer,
    page : pageReducer,
    tosavecontent : tosavecontentReducer
  },
})