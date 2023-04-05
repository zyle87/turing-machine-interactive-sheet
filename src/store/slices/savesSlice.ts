import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CompositionState } from './compositionSlice'
import { DeductionState } from './deductionSlice'
import { DigitCodeState } from './digitCodeSlice'
import { RegistrationState } from './registrationSlice'

type Save = {
  registration: RegistrationState
  digitCode: DigitCodeState
  composition: CompositionState
  deduction: DeductionState
  date: number
}

type SavesState = Save[]

const initialState: SavesState = []

export const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    loadSave: (state, action: PayloadAction<Save>) => {
      const {
        registration: register,
        digitCode,
        composition,
        deduction,
        date,
      } = action.payload

      state.push({
        composition,
        deduction,
        digitCode,
        registration: register,
        date,
      })
    },
    deleteSave: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
  },
})

export const savesActions = savesSlice.actions

export default savesSlice.reducer
