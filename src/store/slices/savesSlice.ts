import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CommentsState } from './commentsSlice'
import { DigitCodeState } from './digitCodeSlice'
import { RegistrationState } from './registrationSlice'
import { RoundsState } from './roundsSlice'

export type Save = {
  comments: CommentsState
  date: number
  digitCode: DigitCodeState
  registration: RegistrationState
  rounds: RoundsState
}

type SavesState = Save[]

const initialState: SavesState = []

export const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Save>) => {
      const { comments, date, digitCode, registration, rounds } = action.payload

      if (registration.hash === '') return state

      const saveIndex = state.findIndex(
        save => save.registration.hash === registration.hash
      )

      if (state[saveIndex]) {
        state[saveIndex].comments = comments
        state[saveIndex].digitCode = digitCode
        state[saveIndex].registration = registration
        state[saveIndex].rounds = rounds
        return state
      } else {
        state.push({
          comments,
          date,
          digitCode,
          registration,
          rounds,
        })
      }
    },
    deleteSave: (state, action: PayloadAction<number>) => {
      const saveIndex = state.findIndex(save => save.date === action.payload)

      state.splice(saveIndex, 1)
    },
  },
})

export const savesActions = savesSlice.actions

export default savesSlice.reducer
