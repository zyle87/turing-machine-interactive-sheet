import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type CodeState = {
  shape: Shape
  digit: Digit
  state: 'correct' | 'incorrect'
}[]

const initialState: CodeState = []

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<CodeState>) => action.payload,
    resetCode: () => initialState,
    toggleDigit: (
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

export const codeActions = codeSlice.actions

export default codeSlice.reducer
