import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC } from 'react'
import Composition from './Composition'
import Code from './Code'
import Register from './Register'

const Root: FC = () => {
  const { theme } = usePaletteMode()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign="center" position="relative" width={320} margin="auto">
        <img
          src={process.env.PUBLIC_URL + 'logo.png'}
          alt="logo"
          style={{ width: 320 }}
        />
        <Box
          color={theme.palette.primary.contrastText}
          position="absolute"
          bottom={theme.spacing(5)}
          left="50%"
          sx={{
            background: theme.palette.common.white,
            transform: 'translateX(-50%)',
          }}
        >
          <h3 style={{ margin: 0 }}>Interactive Sheet</h3>
        </Box>
      </Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Register />
          <Code />
        </Grid>
        <Grid item>
          <Composition />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Root
