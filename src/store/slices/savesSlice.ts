import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CommentsState } from './commentsSlice'
import { DigitCodeState } from './digitCodeSlice'
import { RegistrationState } from './registrationSlice'
import { RoundsState } from './roundsSlice'

type Save = {
  comments: CommentsState
  digitCode: DigitCodeState
  registration: RegistrationState
  rounds: RoundsState
  date: number
}

type SavesState = Save[]

const initialState: SavesState = []

export const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    loadSave: (state, action: PayloadAction<Save>) => {
      const { digitCode, comments, registration, rounds, date } = action.payload

      state.push({
        comments,
        digitCode,
        registration,
        rounds,
        date,
      })
    },
    deleteSave: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
  },
})

export const savesActions = savesSlice.actions

export default savesSlice.reducer
