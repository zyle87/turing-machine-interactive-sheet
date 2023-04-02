import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import ShapeIcon from 'components/ShapeIcon'
import ReactDOMServer from 'react-dom/server'

type Deduction = {
  verifier: Verifier
  ideas: string
  result: string
}

type DeductionType = keyof Omit<Deduction, 'verifier'>

type DeductionState = Deduction[]

const initialState: DeductionState = []

export const deductionSlice = createSlice({
  name: 'deduction',
  initialState,
  reducers: {
    clearDeduction: () => initialState,
    encodeAllDeduction: state => {
      state.forEach(deduction => {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          ;(['ideas', 'result'] as DeductionType[]).map(type => {
            deduction.ideas = deduction.ideas?.replaceAll(
              `:${shape[0]}${shape[1]}:`,
              ReactDOMServer.renderToString(
                <ShapeIcon shape={shape} sizeMultiplier={0.5} />
              )
            )

            deduction.result =
              deduction.result?.replaceAll(
                `:${shape[0]}${shape[1]}:`,
                ReactDOMServer.renderToString(
                  <ShapeIcon shape={shape} sizeMultiplier={0.5} />
                )
              ) || deduction.result

            if (deduction[type]) {
              let found = 0
              let newStr = ''

              for (let i = 0; i < deduction[type].length; i++) {
                newStr +=
                  deduction[type][i] === '~'
                    ? found % 2 === 0
                      ? '<s>'
                      : '</s>'
                    : deduction[type][i]

                deduction[type][i] === '~' && found++
              }

              deduction[type] = newStr
            }
          })
        })
      })
    },
    decodeDeduction: (
      state,
      action: PayloadAction<{ verifier: Verifier; type: DeductionType }>
    ) => {
      const { verifier, type } = action.payload
      const index = state.findIndex(entry => entry.verifier === verifier)

      if (state[index]) {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          state[index][type] = state[index][type].replaceAll(
            ReactDOMServer.renderToString(
              <ShapeIcon shape={shape} sizeMultiplier={0.5} />
            ),
            `:${shape[0]}${shape[1]}:`
          )
        })
        state[index][type] = state[index][type].replaceAll('<s>', `~`)
        state[index][type] = state[index][type].replaceAll('</s>', `~`)
      }
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
