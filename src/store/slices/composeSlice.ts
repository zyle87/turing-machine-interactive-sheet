import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Answer = {
  verifier: Verifier
  state: true | false | 'unknown'
}

type Proposal = {
  shape: Shape
  digit: Digit
}

export type ComposeState = {
  proposals: Proposal[]
  answers: Answer[]
}[]

const initialState: ComposeState = [
  {
    proposals: (['triangle', 'square', 'circle'] as Shape[]).map(shape => ({
      shape,
      digit: 1,
    })),
    answers: (['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[]).map(verifier => ({
      verifier,
      state: 'unknown',
    })),
  },
]

export const composeSlice = createSlice({
  name: 'compose',
  initialState,
  reducers: {
    updateAnswerState: (
      state,
      action: PayloadAction<{ index: number; verifier: Verifier }>
    ) => {
      const { index, verifier } = action.payload
      const composition = state[index]
      const answer = composition.answers.find(
        answer => answer.verifier === verifier
      )

      switch (answer?.state) {
        case 'unknown':
          answer.state = true
          break
        case true:
          answer.state = false
          break
        case false:
          answer.state = 'unknown'
          break
      }

      state[index] = composition
    },
  },
})

export const composeActions = composeSlice.actions

export default composeSlice.reducer
