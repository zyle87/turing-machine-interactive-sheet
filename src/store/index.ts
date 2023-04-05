import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit'
import comments from './slices/commentsSlice'
import digitCode from './slices/digitCodeSlice'
import registration from './slices/registrationSlice'
import rounds from './slices/roundsSlice'
import saves from './slices/savesSlice'
import settings from './slices/settingsSlice'
import { loadState, saveState } from './storage'

const preloadedState = loadState()
const reducer = {
  comments,
  digitCode,
  registration,
  rounds,
  saves,
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
