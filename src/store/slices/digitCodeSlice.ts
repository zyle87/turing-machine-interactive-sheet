import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type DigitCodeState = {
  shape: Shape
  digit: Digit
  state: 'correct' | 'incorrect'
}[]

const initialState: DigitCodeState = []

export const digitCodeSlice = createSlice({
  name: 'digitCode',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<DigitCodeState>) => action.payload,
    reset: () => initialState,
    toggleDigitState: (
      state,
      action: PayloadAction<{ shape: Shape; digit: Digit }>
    ) => {
      const { shape, digit } = action.payload

      const index = state.findIndex(
        entry => entry.shape === shape && entry.digit === digit
      )

      if (index >= 0) {
        switch (state[index].state) {
          case 'incorrect':
            state[index].state = 'correct'
            break
          case 'correct':
            state.splice(index, 1)
            break
        }
      } else {
        state.push({ shape, digit, state: 'incorrect' })
      }
    },
  },
})

export const digitCodeActions = digitCodeSlice.actions

export default digitCodeSlice.reducer
