import GitHubIcon from '@mui/icons-material/GitHub'
import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC } from 'react'
import Code from './Code'
import Composition from './Composition'
import Deduction from './Deduction'
import Register from './Register'

const Root: FC = () => {
  const { theme, togglePaletteMode } = usePaletteMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        textAlign="center"
        position="relative"
        width={320}
        margin="auto"
        mb={5}
      >
        <img
          src={process.env.PUBLIC_URL + 'assets/logo.png'}
          alt="logo"
          style={{ width: 320 }}
        />
        <Box
          color={theme.palette.text.primary}
          position="absolute"
          bottom={theme.spacing(-1)}
          left="50%"
          sx={{
            background: theme.palette.background.paper,
            transform: 'translateX(-50%)',
          }}
        >
          <h3 style={{ margin: 0 }}>Interactive Sheet</h3>
          <Box display="flex" justifyContent="center">
            <IconButton onClick={togglePaletteMode}>
              {theme.palette.mode === 'light' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <IconButton
              href="https://github.com/accuzyle/turing-machine-interactive-sheet"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Register />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Code />
        </Grid>
        <Grid item>
          <Composition />
        </Grid>
        <Grid item>
          <Deduction />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Root
