import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CriteriaCard, criteriaCardPool } from 'hooks/useCriteriaCard'

const verifiers: Verifier[] = ['A', 'B', 'C', 'D', 'E', 'F']

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

type Comment = {
  verifier: Verifier
  criteriaCards: CriteriaCard[]
}

export type CommentsState = Comment[]

const initialState: CommentsState = []

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<CommentsState>) => action.payload,
    reset: () => initialState,
    setCards: (
      state,
      action: PayloadAction<{
        fake?: number[]
        ind: number[]
        m?: number
      }>
    ) => {
      const { fake, ind, m } = action.payload

      const addAdditionalCardAttributes = (card: number) => {
        return {
          ...criteriaCardPool.find((cc) => cc.id === card)!,
          nightmare: m === 2
        }
      }

      for (let i = 0; i < ind.length; i++) {
        if (fake) {
          const cards = [ind[i], fake[i]]
          const shuffledCards = shuffle(cards)

          state.push({
            verifier: verifiers[i],
            criteriaCards: [
              addAdditionalCardAttributes(shuffledCards[0]),
              addAdditionalCardAttributes(shuffledCards[1]),
            ],
          })
        } else {
          const card = ind.sort((n1, n2) => n1 - n2)[i]

          state.push({
            verifier: verifiers[i],
            criteriaCards: [
              addAdditionalCardAttributes(card),
            ],
          })
        }
      }
    },
    updateCard: (
      state,
      action: PayloadAction<{
        verifier: Verifier
        index: number
        card?: CriteriaCard
      }>
    ) => {
      const { verifier, index, card } = action.payload

      if (!card) return

      const comment = state.find(comment => comment.verifier === verifier)
      if (comment) {
        comment.criteriaCards[index] = card
      } else {
        state.push({
          criteriaCards: [card],
          verifier,
        })
      }
    },
  },
})

export const commentsActions = commentsSlice.actions

export default commentsSlice.reducer
