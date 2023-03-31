import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type DeductionState = {
  verifier: Verifier
  ideas: string
  result: string
}[]

const initialState: DeductionState = []

export const deductionSlice = createSlice({
  name: 'deduction',
  initialState,
  reducers: {
    clearDeduction: () => initialState,
    updateIdeas: (
      state,
      action: PayloadAction<{ verifier: Verifier; ideas: string }>
    ) => {
      const { verifier, ideas } = action.payload
      const deduction = state.find(entry => entry.verifier === verifier)
      if (deduction) {
        deduction.ideas = ideas
      } else {
        state.push({ verifier, ideas, result: '' })
      }
    },
    updateResult: (
      state,
      action: PayloadAction<{ verifier: Verifier; result: string }>
    ) => {
      const { verifier, result } = action.payload
      const deduction = state.find(entry => entry.verifier === verifier)
      if (deduction) {
        deduction.result = result
      } else {
        state.push({ verifier, ideas: '', result })
      }
    },
  },
})

export const deductionActions = deductionSlice.actions

export default deductionSlice.reducer
