import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC } from 'react'
import Compose from './Compose'
import Register from './Register'
import Deduce from './Deduce'

const Root: FC = () => {
  const { theme } = usePaletteMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ margin: theme.spacing(2, 'auto'), width: 320 }}>
        <Register />
        <Compose />
        <Deduce />
      </Box>
    </ThemeProvider>
  )
}

export default Root
