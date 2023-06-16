import { useMemo, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export type CriteriaCard = {
  id: number
  criteriaSlots: 1 | 2 | 3 | 4 | 6 | 9
  irrelevantCriteria: number[]
}

export const criteriaCardPool: CriteriaCard[] = [
  { id: 1, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 2, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 3, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 4, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 5, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 6, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 7, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 8, criteriaSlots: 4, irrelevantCriteria: [] },
  { id: 9, criteriaSlots: 4, irrelevantCriteria: [] },
  { id: 10, criteriaSlots: 4, irrelevantCriteria: [] },
  { id: 11, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 12, criteriaSlots: 3, irrelevantCriteria: [] },
]

const getCardUrl = (card?: CriteriaCard) =>
  card
    ? `https://turingmachine.info/images/criteriacards/EN/TM_GameCards_EN-${(
        '0' + card.id
      ).slice(-2)}.png`
    : ''

export const useCriteriaCard = (verifier: Verifier) => {
  const comments = useAppSelector(state => state.comments)

  const [card, setCard] = useState<Undefinable<CriteriaCard>>(
    comments.find(comment => comment.verifier === verifier)?.criteriaCard
  )

  const dispatch = useAppDispatch()

  const setCardFormId = (id: number) => {
    setCard(criteriaCardPool.find(card => card.id === id))
  }

  const toggleCriteria = (criteria: number) => {
    if (!card) return

    const criteriaIndex = card.irrelevantCriteria.indexOf(criteria)

    if (criteriaIndex === -1) {
      setCard({
        ...card,
        irrelevantCriteria: [...card.irrelevantCriteria, criteria],
      })
    } else {
      setCard({
        ...card,
        irrelevantCriteria: [
          ...card.irrelevantCriteria.slice(0, criteriaIndex),
          ...card.irrelevantCriteria.slice(criteriaIndex + 1),
        ],
      })
    }
  }

  const cardImage = useMemo(() => getCardUrl(card), [card])
  const poolLength = useMemo(() => criteriaCardPool.length, [])

  useUpdateEffect(() => {
    dispatch(commentsActions.updateCard({ verifier, card }))
  }, [card])

  return {
    card,
    cardImage,
    setCardFormId,
    poolLength,
    toggleCriteria,
  }
}
