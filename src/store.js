import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './components/auth/AuthSlice'
import ProjectsReducer from './components/projects/ProjectsSlice'
export const store = configureStore({
  reducer: {
    user: AuthReducer,
    projects: ProjectsReducer
  },
})