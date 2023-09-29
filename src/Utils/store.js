import { configureStore } from '@reduxjs/toolkit'
import contentReducer  from './Reducers/contentSlice'
import pageReducer  from './Reducers/pageSlice'
import tosavecontentReducer from './Reducers/toSaveContentSlice'
import directorySlice from './Reducers/directorySlice'
import userSlice from './Reducers/userSlice'


export default configureStore({
  reducer: {
    content : contentReducer,
    page : pageReducer,
    tosavecontent : tosavecontentReducer,
    directory : directorySlice,
    user : userSlice,
  },
})