import { createSlice } from '@reduxjs/toolkit'

export type SettingsState = {
  paletteMode: PaletteMode
  storeVersion: number
  language: string;
}

const initialState: SettingsState = {
  paletteMode: 'light',
  storeVersion: parseInt(process.env.REACT_APP_STORE_VERSION),
  language: "EN",
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePaletteMode: state => {
      state.paletteMode = state.paletteMode === 'light' ? 'dark' : 'light'
    },
    updateLanguage: (state, action) => {
      state.language = action.payload
    }
  },
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer
