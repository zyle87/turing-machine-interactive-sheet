import { createSlice } from '@reduxjs/toolkit'

export type SettingsState = {
  paletteMode: PaletteMode
  storeVersion: number
}

const initialState: SettingsState = {
  paletteMode: 'light',
  storeVersion: parseInt(process.env.REACT_APP_STORE_VERSION),
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePaletteMode: state => {
      state.paletteMode = state.paletteMode === 'light' ? 'dark' : 'light'
    },
  },
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer
