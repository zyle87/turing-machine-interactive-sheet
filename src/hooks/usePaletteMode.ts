import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { settingsActions } from '../store/slices/settingsSlice'
import { customTheme } from '../theme'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export const usePaletteMode = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(state => state.settings)

  const togglePaletteMode = () => {
    dispatch(settingsActions.togglePaletteMode())
  }

  const theme = useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: {
          mode: settings.paletteMode,
        },
      }),
    [settings.paletteMode]
  )
  return { theme, togglePaletteMode }
}
