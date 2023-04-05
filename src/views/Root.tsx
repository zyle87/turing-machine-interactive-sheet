import UploadIcon from '@mui/icons-material/AddCircleOutlineRounded'
import LoadIcon from '@mui/icons-material/ContentPasteGoRounded'
import DeleteIcon from '@mui/icons-material/ContentPasteOffRounded'
import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import SaveIcon from '@mui/icons-material/SaveRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { usePaletteMode } from 'hooks/usePaletteMode'
import { FC, useState } from 'react'
import { roundsActions } from 'store/slices/roundsSlice'
import { deductionActions } from 'store/slices/deductionSlice'
import { digitCodeActions } from 'store/slices/digitCodeSlice'
import { registrationActions } from 'store/slices/registrationSlice'
import { savesActions } from 'store/slices/savesSlice'
import Rounds from './Rounds'
import Deduction from './Deduction'
import DigitCode from './DigitCode'
import Registration from './Registration'

const Root: FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const saves = useAppSelector(state => state.saves)
  const { theme, togglePaletteMode } = usePaletteMode()

  const [saveDialog, setSaveDialog] = useState(false)

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
          <h3 style={{ margin: 0 }}>Interactive Sheet</h3>
          <Box display="flex" justifyContent="center">
            <IconButton
              aria-label="saves"
              onClick={() => {
                setSaveDialog(!saveDialog)
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
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <DigitCode />
        </Grid>
        <Grid item>
          <Rounds />
        </Grid>
        <Grid item>
          <Deduction />
        </Grid>
      </Grid>
      <Dialog
        onClose={() => {
          setSaveDialog(!saveDialog)
        }}
        open={saveDialog}
      >
        <List sx={{ width: 320, p: 2 }}>
          {saves.map((save, index) => (
            <Box key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width={1}
              >
                <Box>
                  <Typography>{save.registration.hash}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {new Date(save.date).getMonth()}/
                    {new Date(save.date).getDay()}/
                    {new Date(save.date).getFullYear()}
                  </Typography>
                </Box>
                <Box display="flex">
                  <IconButton
                    aria-label="load"
                    color="primary"
                    onClick={() => {
                      dispatch(digitCodeActions.load(save.digitCode))
                      dispatch(roundsActions.load(save.rounds))
                      dispatch(deductionActions.load(save.deduction))
                      dispatch(registrationActions.load(save.registration))
                    }}
                  >
                    <LoadIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => {
                      dispatch(savesActions.deleteSave(index))
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box my={2}>
                <Divider />
              </Box>
            </Box>
          ))}
          <Button
            aria-label="save"
            disabled={state.registration.hash === ''}
            fullWidth
            size="large"
            onClick={() => {
              dispatch(savesActions.loadSave({ ...state, date: Date.now() }))
            }}
          >
            <UploadIcon />
          </Button>
        </List>
      </Dialog>
    </ThemeProvider>
  )
}

export default Root
