import { useEffect, useMemo, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export type CriteriaCard = {
  id: number
  criteriaSlots: 1 | 2 | 3 | 4 | 6 | 9
  irrelevantCriteria: number[]
  nightmare?: boolean
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
  { id: 13, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 14, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 15, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 16, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 17, criteriaSlots: 4, irrelevantCriteria: [] },
  { id: 18, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 19, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 20, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 21, criteriaSlots: 2, irrelevantCriteria: [] },
  { id: 22, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 23, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 24, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 25, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 26, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 27, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 28, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 29, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 30, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 31, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 32, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 33, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 34, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 35, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 36, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 37, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 38, criteriaSlots: 3, irrelevantCriteria: [] },
  { id: 39, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 40, criteriaSlots: 9, irrelevantCriteria: [] },
  { id: 41, criteriaSlots: 9, irrelevantCriteria: [] },
  { id: 42, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 43, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 44, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 45, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 46, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 47, criteriaSlots: 6, irrelevantCriteria: [] },
  { id: 48, criteriaSlots: 9, irrelevantCriteria: [] },
]

const getCardUrl = (card?: CriteriaCard, language?: string) =>
  (card && language)
    ? `https://turingmachine.info/images/criteriacards/${language}/TM_GameCards_${language}-${( "0" + card.id ).slice(-2)}.png`
    : "";

export const useCriteriaCard = (verifier: Verifier, index: number) => {
  const language = useAppSelector((state) => state.settings.language);
  const comments = useAppSelector(state => state.comments)

  const [card, setCard] = useState<Undefinable<CriteriaCard>>(
    comments.find(comment => comment.verifier === verifier)?.criteriaCards[
      index
    ]
  )

  useEffect(() => {
    setCard(
      comments.find(comment => comment.verifier === verifier)?.criteriaCards[
        index
      ]
    )
  }, [comments, index, verifier])

  const dispatch = useAppDispatch()

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

  const cardImage = useMemo(() => getCardUrl(card, language), [card, language]);

  useUpdateEffect(() => {
    dispatch(commentsActions.updateCard({ verifier, index, card }))
  }, [card])

  return {
    card,
    cardImage,
    toggleCriteria,
  }
}
