import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC } from 'react'

const Root: FC = () => {
  const { theme } = usePaletteMode()

  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </main>
  )
}

export default Root
