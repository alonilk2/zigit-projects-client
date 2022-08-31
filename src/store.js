import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './components/auth/AuthSlice'
export const store = configureStore({
  reducer: {
    user: AuthSlice
  },
})