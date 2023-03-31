import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Answer = {
  verifier: Verifier
  state: 'correct' | 'incorrect' | 'unknown'
}

type Proposal = {
  shape: Shape
  digit: Nullable<Digit>
}

export type ComposeState = {
  proposals: Proposal[]
  answers: Answer[]
}[]

const initialState: ComposeState = [
  {
    proposals: (['triangle', 'square', 'circle'] as Shape[]).map(shape => ({
      shape,
      digit: null,
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
    resetCompose: () => initialState,
    addComposition: state => {
      state.push({
        proposals: (['triangle', 'square', 'circle'] as Shape[]).map(shape => ({
          shape,
          digit: null,
        })),
        answers: (['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[]).map(
          verifier => ({
            verifier,
            state: 'unknown',
          })
        ),
      })
    },
    updateProposalDigit: (
      state,
      action: PayloadAction<{
        index: number
        shape: Shape
        digit: Nullable<Digit>
      }>
    ) => {
      const { index, shape, digit } = action.payload
      const composition = state[index]
      const proposal = composition.proposals.find(
        proposal => proposal.shape === shape
      )!

      proposal.digit = digit

      state[index] = composition
    },
    updateAnswerState: (
      state,
      action: PayloadAction<{ index: number; verifier: Verifier }>
    ) => {
      const { index, verifier } = action.payload
      const composition = state[index]
      const answer = composition.answers.find(
        answer => answer.verifier === verifier
      )!

      switch (answer.state) {
        case 'unknown':
          answer.state = 'incorrect'
          break
        case 'incorrect':
          answer.state = 'correct'
          break
        case 'correct':
          answer.state = 'unknown'
          break
      }

      state[index] = composition
    },
  },
})

export const composeActions = composeSlice.actions

export default composeSlice.reducer
