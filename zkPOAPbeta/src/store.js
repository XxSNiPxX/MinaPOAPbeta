import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import eventReducer from './features/event/eventSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    event:eventReducer,
  }
})
export default store
