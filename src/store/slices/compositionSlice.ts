import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Query = {
  verifier: Verifier
  state: 'solved' | 'unsolved' | 'unknown'
}

type Proposal = {
  shape: Shape
  digit: Nullable<Digit>
}

export type CompositionState = {
  proposals: Proposal[]
  queries: Query[]
}[]

const initialState: CompositionState = []

export const compositionSlice = createSlice({
  name: 'composition',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<CompositionState>) => action.payload,
    resetComposition: () => initialState,
    deleteCompositionEntry: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
    addComposition: state => {
      state.push({
        proposals: (['triangle', 'square', 'circle'] as Shape[]).map(shape => ({
          shape,
          digit: null,
        })),
        queries: (['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[]).map(
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
      const answer = composition.queries.find(
        answer => answer.verifier === verifier
      )!

      switch (answer.state) {
        case 'unknown':
          answer.state = 'unsolved'
          break
        case 'unsolved':
          answer.state = 'solved'
          break
        case 'solved':
          answer.state = 'unknown'
          break
      }

      state[index] = composition
    },
  },
})

export const compositionActions = compositionSlice.actions

export default compositionSlice.reducer
