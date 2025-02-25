import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { settingsActions } from '../store/slices/settingsSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

declare module '@mui/material/styles' {
  interface Palette {
    languageSwitch: Palette['primary'];
  }

  interface PaletteOptions {
    languageSwitch?: PaletteOptions['primary'];
  }
}

export const usePaletteMode = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(state => state.settings)

  const togglePaletteMode = () => {
    dispatch(settingsActions.togglePaletteMode())
  }

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 704,
            lg: 1384,
            xl: 1920,
          },
        },
        palette: {
          primary: {
            main: '#35b663',
          },
          secondary: {
            main: '#ff1744',
          },
          languageSwitch: {
            100: '#E5EAF2',
            300: '#C7D0DD',
            800: '#303740',
            900: '#1C2025',
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
