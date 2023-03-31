import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type RegisterState = {
  name: string
  hash: string
}

const initialState: RegisterState = {
  name: '',
  hash: '',
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    updateHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload
    },
  },
})

export const registerActions = registerSlice.actions

export default registerSlice.reducer
