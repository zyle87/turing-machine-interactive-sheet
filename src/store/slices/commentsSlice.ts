import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Comment = {
  verifier: Verifier
  drawing: string
  assumption: string
  conclusion: string
}

type CommentCategory = keyof Omit<Comment, 'verifier'>

export type CommentsState = Comment[]

const initialState: CommentsState = []

const shapeMarkup = {
  triangle: `<span style="font-family: Shapes;">i</span>`,
  square: `<span style="font-family: Shapes;">j</span>`,
  circle: `<span style="font-family: Shapes;">g</span>`,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<CommentsState>) => action.payload,
    clearComments: () => initialState,
    encodeAllComments: state => {
      state.forEach(comment => {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          ;(['assumption', 'conclusion'] as CommentCategory[]).forEach(type => {
            comment.assumption = comment.assumption.replaceAll(
              `:${shape[0]}${shape[1]}:`,
              shapeMarkup[shape]
            )

            comment.conclusion = comment.conclusion?.replaceAll(
              `:${shape[0]}${shape[1]}:`,
              shapeMarkup[shape]
            )

            if (comment[type]) {
              let count = 0
              let newStr = ''

              for (let i = 0; i < comment[type].length; i++) {
                newStr +=
                  comment[type][i] === '~'
                    ? count % 2 === 0
                      ? '<span style="text-decoration: underline;text-underline-offset: -7px;text-decoration-skip-ink: none;">'
                      : '</span>'
                    : comment[type][i]

                comment[type][i] === '~' && count++
              }

              comment[type] = newStr
            }
          })
        })
      })
    },
    decodeComment: (
      state,
      action: PayloadAction<{ verifier: Verifier; category: CommentCategory }>
    ) => {
      const { verifier, category } = action.payload
      const index = state.findIndex(entry => entry.verifier === verifier)

      if (state[index]) {
        ;(['triangle', 'square', 'circle'] as Shape[]).forEach(shape => {
          state[index][category] = state[index][category].replaceAll(
            shapeMarkup[shape],
            `:${shape[0]}${shape[1]}:`
          )
        })
        state[index][category] = state[index][category].replaceAll(
          '<span style="text-decoration: underline;text-underline-offset: -7px;text-decoration-skip-ink: none;">',
          `~`
        )
        state[index][category] = state[index][category].replaceAll(
          '</span>',
          `~`
        )
      }
    },
    updateDrawing: (
      state,
      action: PayloadAction<{ verifier: Verifier; drawing: string }>
    ) => {
      const { verifier, drawing } = action.payload
      const comment = state.find(comment => comment.verifier === verifier)
      if (comment) {
        comment.drawing = drawing
      } else {
        state.push({ verifier, drawing, assumption: '', conclusion: '' })
      }
    },
    updateAssumption: (
      state,
      action: PayloadAction<{ verifier: Verifier; assumption: string }>
    ) => {
      const { verifier, assumption } = action.payload
      const comment = state.find(comment => comment.verifier === verifier)
      if (comment) {
        comment.assumption = assumption
      } else {
        state.push({ verifier, drawing: '', assumption, conclusion: '' })
      }
    },
    updateConclusion: (
      state,
      action: PayloadAction<{ verifier: Verifier; conclusion: string }>
    ) => {
      const { verifier, conclusion } = action.payload
      const comment = state.find(comment => comment.verifier === verifier)
      if (comment) {
        comment.conclusion = conclusion
      } else {
        state.push({ verifier, drawing: '', assumption: '', conclusion })
      }
    },
  },
})

export const commentsActions = commentsSlice.actions

export default commentsSlice.reducer
