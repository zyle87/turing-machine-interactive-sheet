import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC } from 'react'
import Composition from './Composition'
import Hypothesis from './Hypothesis'
import Registration from './Registration'

const Root: FC = () => {
  const { theme } = usePaletteMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ margin: '8px auto', width: 320 }}>
        <Registration />
        <Hypothesis />
        <Composition />
      </Box>
    </ThemeProvider>
  )
}

export default Root
