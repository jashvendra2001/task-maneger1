import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer
  },
})