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
    encodeDeduction: state => {
      state.map(deduction => {
        deduction.ideas = deduction.ideas.replaceAll(
          ':tr:',
          ReactDOMServer.renderToString(
            <ShapeIcon shape="triangle" sizeMultiplier={0.5} />
          )
        )
        deduction.ideas = deduction.ideas.replaceAll(
          ':sq:',
          ReactDOMServer.renderToString(
            <ShapeIcon shape="square" sizeMultiplier={0.5} />
          )
        )
        deduction.ideas = deduction.ideas.replaceAll(
          ':ci:',
          ReactDOMServer.renderToString(
            <ShapeIcon shape="circle" sizeMultiplier={0.5} />
          )
        )
      })
    },
    decodeDeduction: state => {
      state.map(deduction => {
        deduction.ideas = deduction.ideas.replaceAll(
          ReactDOMServer.renderToString(
            <ShapeIcon shape="triangle" sizeMultiplier={0.5} />
          ),
          ':tr:'
        )
        deduction.ideas = deduction.ideas.replaceAll(
          ReactDOMServer.renderToString(
            <ShapeIcon shape="square" sizeMultiplier={0.5} />
          ),
          ':sq:'
        )
        deduction.ideas = deduction.ideas.replaceAll(
          ReactDOMServer.renderToString(
            <ShapeIcon shape="circle" sizeMultiplier={0.5} />
          ),
          ':ci:'
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
