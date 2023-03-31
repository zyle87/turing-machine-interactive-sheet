import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit'
import code from './slices/codeSlice'
import composition from './slices/compositionSlice'
import deduction from './slices/deductionSlice'
import register from './slices/registerSlice'
import settings from './slices/settingsSlice'
import { loadState, saveState } from './storage'

const preloadedState = loadState()
const reducer = {
  code,
  composition,
  deduction,
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
