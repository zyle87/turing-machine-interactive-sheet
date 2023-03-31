import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit'
import compose from './slices/composeSlice'
import deduce from './slices/deduceSlice'
import register from './slices/registerSlice'
import settings from './slices/settingsSlice'
import { loadState, saveState } from './storage'

const preloadedState = loadState()
const reducer = {
  compose,
  deduce,
  register,
  settings,
}

export const store = configureStore({
  preloadedState,
  reducer,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch
