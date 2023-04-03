import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Deduction = {
  verifier: Verifier
  ideas: string
  result: string
}

type DeductionType = keyof Omit<Deduction, 'verifier'>

type DeductionState = Deduction[]

const initialState: DeductionState = []

const shapeMarkup = {
  triangle: `<span style="font-family: Shapes;">i</span>`,
  square: `<span style="font-family: Shapes;">j</span>`,
  circle: `<span style="font-family: Shapes;">g</span>`,
}

export const deductionSlice = createSlice({
  name: 'deduction',
  initialState,
  reducers: {
    clearDeduction: () => initialState,
    encodeAllDeduction: state => {
      state.forEach(deduction => {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          ;(['ideas', 'result'] as DeductionType[]).forEach(type => {
            deduction.ideas = deduction.ideas.replaceAll(
              `:${shape[0]}${shape[1]}:`,
              shapeMarkup[shape]
            )

            deduction.result = deduction.result?.replaceAll(
              `:${shape[0]}${shape[1]}:`,
              shapeMarkup[shape]
            )

            if (deduction[type]) {
              let count = 0
              let newStr = ''

              for (let i = 0; i < deduction[type].length; i++) {
                newStr +=
                  deduction[type][i] === '~'
                    ? count % 2 === 0
                      ? '<span style="text-decoration: underline;text-underline-offset: -7px;text-decoration-skip-ink: none;">'
                      : '</span>'
                    : deduction[type][i]

                deduction[type][i] === '~' && count++
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
          state[index][type] = state[index][type]
            .replaceAll(shapeMarkup[shape], `:${shape[0]}${shape[1]}:`)
        })
        state[index][type] = state[index][type].replaceAll(
          '<span style="text-decoration: underline;text-underline-offset: -7px;text-decoration-skip-ink: none;">',
          `~`
        )
        state[index][type] = state[index][type].replaceAll('</span>', `~`)
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
