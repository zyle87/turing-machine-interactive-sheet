import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type DeductionState = {}

const initialState: DeductionState = {}

export const deductionSlice = createSlice({
  name: 'deduction',
  initialState,
  reducers: {},
})

export const deductionActions = deductionSlice.actions

export default deductionSlice.reducer
