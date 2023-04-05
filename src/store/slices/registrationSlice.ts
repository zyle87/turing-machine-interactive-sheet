import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type RegistrationState = {
  name: string
  hash: string
}

const initialState: RegistrationState = {
  name: '',
  hash: '',
}

export const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<RegistrationState>) => action.payload,
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    updateHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload
    },
  },
})

export const registrationActions = registrationSlice.actions

export default registrationSlice.reducer
