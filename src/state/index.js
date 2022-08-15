import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {},
  middleware: [...getDefaultMiddleware({ thunk: true })],
})

export default store
