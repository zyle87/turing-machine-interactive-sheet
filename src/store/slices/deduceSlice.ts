import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type DeduceState = {
  shape: Shape
  digit: Digit
  state: 'correct' | 'incorrect'
}[]

const initialState: DeduceState = []

export const deduceSlice = createSlice({
  name: 'deduce',
  initialState,
  reducers: {
    resetDeduce: () => initialState,
    toggleDeduction: (
      state,
      action: PayloadAction<{ shape: Shape; digit: Digit }>
    ) => {
      const { shape, digit } = action.payload

      const deductionIndex = state.findIndex(
        deduction => deduction.shape === shape && deduction.digit === digit
      )

      if (deductionIndex >= 0) {
        switch (state[deductionIndex].state) {
          case 'incorrect':
            state[deductionIndex].state = 'correct'
            break
          case 'correct':
            state.splice(deductionIndex, 1)
            break
        }
      } else {
        state.push({ shape, digit, state: 'incorrect' })
      }
    },
  },
})

export const deduceActions = deduceSlice.actions

export default deduceSlice.reducer
