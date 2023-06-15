import NewIcon from '@mui/icons-material/ContentPasteRounded'
import SaveIcon from '@mui/icons-material/ContentPasteSearchRounded'
import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import AddIcon from '@mui/icons-material/FiberNewRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'
import { digitCodeActions } from 'store/slices/digitCodeSlice'
import { registrationActions } from 'store/slices/registrationSlice'
import { roundsActions } from 'store/slices/roundsSlice'
import { savesActions } from 'store/slices/savesSlice'
import Comments from './Comments'
import DigitCode from './DigitCode'
import Registration from './Registration'
import Rounds from './Rounds'
import Saves from './Saves'

const Root: FC = () => {
  const { theme, togglePaletteMode } = usePaletteMode()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))
  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'))
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)

  const [savesDialog, setSavesDialog] = useState(false)
  const [resetKey, setResetKey] = useState(Date.now())
  const [hasBadge, setHasBadge] = useState(false)

  useUpdateEffect(() => {
    state.saves.length === 0 && setSavesDialog(false)
  }, [state.saves])

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
          bottom={theme.spacing(-3)}
          left="50%"
          sx={{
            background: theme.palette.background.paper,
            transform: 'translateX(-50%)',
          }}
        >
          <h3
            style={{
              margin: theme.spacing(0.5, 0, 2),
              transform: 'rotate(-2deg)',
            }}
          >
            Interactive Sheet
          </h3>
          <Box display="flex" justifyContent="center" position="relative">
            <IconButton
              aria-label="new"
              color="primary"
              onClick={() => {
                state.registration.hash && setHasBadge(true)

                dispatch(savesActions.save({ ...state, date: Date.now() }))

                dispatch(roundsActions.resetRounds())
                dispatch(commentsActions.clearComments())
                dispatch(digitCodeActions.resetCode())
                dispatch(registrationActions.updateHash(''))
                dispatch(registrationActions.updateName(''))

                setResetKey(Date.now())
              }}
              sx={{ position: 'relative' }}
            >
              <NewIcon />
              <Box
                sx={{
                  background: theme.palette.background.default,
                  width: theme.spacing(2),
                  height: theme.spacing(2),
                  bottom: 8,
                  position: 'absolute',
                  right: 8,
                }}
              >
                <AddIcon
                  fontSize="small"
                  sx={{
                    position: 'absolute',
                    right: -6,
                    bottom: -4,
                    fontSize: 20,
                  }}
                />
              </Box>
            </IconButton>
            <IconButton
              aria-label="saves"
              disabled={state.saves.length === 0}
              color="primary"
              onClick={() => {
                setHasBadge(false)
                setSavesDialog(!savesDialog)
              }}
            >
              <Badge variant="dot" color="secondary" invisible={!hasBadge}>
                <SaveIcon />
              </Badge>
            </IconButton>
            <Divider
              orientation="vertical"
              sx={{ height: 'auto', margin: theme.spacing(0, 1) }}
            />
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
      <Container key={resetKey} sx={{ maxWidth: isUpMd ? 704 : undefined }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={3} md={6} xs={12}>
            <Rounds />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            {isUpLg ? <Comments /> : <DigitCode />}
          </Grid>
          <Grid item lg={3} xs={12}>
            {isUpLg ? <DigitCode /> : <Comments />}
          </Grid>
        </Grid>
      </Container>
      <Saves
        isOpen={savesDialog}
        onClose={() => {
          setSavesDialog(false)
        }}
        onLoad={() => {
          setSavesDialog(false)
        }}
      />
    </ThemeProvider>
  )
}

export default Root
