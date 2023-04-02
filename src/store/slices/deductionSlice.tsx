import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import ShapeIcon from 'components/ShapeIcon'
import ReactDOMServer from 'react-dom/server'

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
    encodeAllDeduction: state => {
      state.forEach(deduction => {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          deduction.ideas = deduction.ideas.replaceAll(
            `:${shape[0]}${shape[1]}:`,
            ReactDOMServer.renderToString(
              <ShapeIcon shape={shape} sizeMultiplier={0.5} />
            )
          )
          deduction.result = deduction.result.replaceAll(
            `:${shape[0]}${shape[1]}:`,
            ReactDOMServer.renderToString(
              <ShapeIcon shape={shape} sizeMultiplier={0.5} />
            )
          )
        })
      })
    },
    decodeDeduction: (
      state,
      action: PayloadAction<{ verifier: Verifier; type: 'ideas' | 'result' }>
    ) => {
      const { verifier, type } = action.payload
      const index = state.findIndex(entry => entry.verifier === verifier)

      ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
        state[index][type] = state[index][type].replaceAll(
          ReactDOMServer.renderToString(
            <ShapeIcon shape={shape} sizeMultiplier={0.5} />
          ),
          `:${shape[0]}${shape[1]}:`
        )
      })
    },
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
