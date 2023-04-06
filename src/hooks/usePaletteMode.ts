import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { settingsActions } from '../store/slices/settingsSlice'
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
        palette: {
          primary: {
            main: '#35b663',
          },
          secondary: {
            main: '#ff1744',
          },
          mode: settings.paletteMode,
        },
        typography: {
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 16,
          button: {
            fontWeight: 700,
          },
          body1: {
            fontWeight: 700,
            fontFamily: 'Kalam',
          },
          body2: {
            fontFamily: 'Kalam',
          },
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [settings.paletteMode]
  )
  return { theme, togglePaletteMode }
}
