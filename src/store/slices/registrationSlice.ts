import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type RegistrationState = {
  name: string
  hash: string
  status: 'new' | 'fetch' | 'ready'
}

const initialState: RegistrationState = {
  name: '',
  hash: '',
  status: 'new',
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<RegistrationState>) => action.payload,
    reset: () => initialState,
    fetch: state => ({
      ...state,
      status: 'fetch',
    }),
    fetchBad: state => ({
      ...state,
      status: 'new',
    }),
    fetchDone: state => ({
      ...state,
      status: 'ready',
    }),
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    updateHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload.replace('#', '')
    },
  },
})

export const registrationActions = registrationSlice.actions

export default registrationSlice.reducer
