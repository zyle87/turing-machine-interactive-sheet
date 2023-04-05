import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CodeState } from './codeSlice'
import { CompositionState } from './compositionSlice'
import { DeductionState } from './deductionSlice'
import { RegisterState } from './registerSlice'

type Save = {
  register: RegisterState
  code: CodeState
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
    save: (state, action: PayloadAction<Save>) => {
      const { register, code, composition, deduction, date } = action.payload

      state.push({
        code,
        composition,
        deduction,
        register,
        date,
      })
    },
    delete: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
  },
})

export const savesActions = savesSlice.actions

export default savesSlice.reducer
