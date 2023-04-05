import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Query = {
  verifier: Verifier
  state: 'solved' | 'unsolved' | 'unknown'
}

type Code = {
  shape: Shape
  digit: Nullable<Digit>
}

export type RoundsState = {
  code: Code[]
  queries: Query[]
}[]

const initialState: RoundsState = []

export const roundsSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<RoundsState>) => action.payload,
    resetRounds: () => initialState,
    deleteRound: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
    addRound: state => {
      state.push({
        code: (['triangle', 'square', 'circle'] as Shape[]).map(shape => ({
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
    updateRoundDigit: (
      state,
      action: PayloadAction<{
        index: number
        shape: Shape
        digit: Nullable<Digit>
      }>
    ) => {
      const { index, shape, digit } = action.payload
      const round = state[index]
      const code = round.code.find(code => code.shape === shape)!

      code.digit = digit

      state[index] = round
    },
    updateQueryState: (
      state,
      action: PayloadAction<{ index: number; verifier: Verifier }>
    ) => {
      const { index, verifier } = action.payload
      const round = state[index]
      const query = round.queries.find(query => query.verifier === verifier)!

      switch (query.state) {
        case 'unknown':
          query.state = 'unsolved'
          break
        case 'unsolved':
          query.state = 'solved'
          break
        case 'solved':
          query.state = 'unknown'
          break
      }

      state[index] = round
    },
  },
})

export const roundsActions = roundsSlice.actions

export default roundsSlice.reducer
