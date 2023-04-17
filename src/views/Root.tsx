import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import SaveIcon from '@mui/icons-material/SaveRounded'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider } from '@mui/material/styles'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC, useState } from 'react'
import Comments from './Comments'
import DigitCode from './DigitCode'
import Registration from './Registration'
import Rounds from './Rounds'
import Saves from './Saves'

const Root: FC = () => {
  const { theme, togglePaletteMode } = usePaletteMode()
  const isUpMd = theme.breakpoints.up('md')

  const [savesDialog, setSavesDialog] = useState(false)

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
          position="absolute"
          bottom={theme.spacing(-1)}
          left="50%"
          sx={{
            background: theme.palette.background.paper,
            transform: 'translateX(-50%)',
          }}
        >
          <h3 style={{ margin: 0, transform: 'rotate(-2deg)' }}>
            Interactive Sheet
          </h3>
          <Box display="flex" justifyContent="center">
            <IconButton
              aria-label="saves"
              onClick={() => {
                setSavesDialog(!savesDialog)
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              aria-label="toggle palette mode"
              onClick={togglePaletteMode}
            >
              {theme.palette.mode === 'light' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="github"
              href="https://github.com/accuzyle/turing-machine-interactive-sheet"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Registration />
      <Container sx={{ maxWidth: isUpMd ? 704 : undefined }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={3} md={6} xs={12}>
            <DigitCode />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Rounds />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Comments />
          </Grid>
        </Grid>
      </Container>
      <Saves
        isOpen={savesDialog}
        onClose={() => {
          setSavesDialog(false)
        }}
      />
    </ThemeProvider>
  )
}

export default Root
