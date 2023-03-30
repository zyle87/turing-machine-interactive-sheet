import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

// Use throughout your app instead of plain `useDispatch` to get strongly typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
