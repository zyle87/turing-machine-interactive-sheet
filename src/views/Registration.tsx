import LoadIcon from '@mui/icons-material/HourglassTopRounded'
import HashIcon from '@mui/icons-material/NumbersRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import OkIcon from '@mui/icons-material/ThumbUpAltRounded'
import SearchIcon from '@mui/icons-material/TravelExploreRounded'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Snackbar from '@mui/material/Snackbar'
import { alpha, useTheme } from '@mui/material/styles'
import axios from 'axios'
import TextField from 'components/TextField'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useState } from 'react'
import { commentsActions } from 'store/slices/commentsSlice'
import { digitCodeActions } from 'store/slices/digitCodeSlice'
import { registrationActions } from 'store/slices/registrationSlice'
import { roundsActions } from 'store/slices/roundsSlice'

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
      (typeof performance !== "undefined" &&
          performance.now &&
          performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
  ) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
      } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
if(!window.turing_game_uuid) {
  window.turing_game_uuid = generateUUID();
}
const Registration: FC = () => {
  const dispatch = useAppDispatch()
  const registration = useAppSelector(state => state.registration)
  const [showNotFound, setShowNotFound] = useState(false)
  const theme = useTheme()

  const onSubmit = () => {
    dispatch(registrationActions.fetch())

    axios
      .get(process.env.REACT_APP_API_END_POINT, {
        params: {
          h: registration.hash,
          uuid: window.turing_game_uuid
        },
      })
      .then(response => response.data)
      .then(data => {
        dispatch(roundsActions.reset())
        dispatch(commentsActions.reset())
        dispatch(digitCodeActions.reset())

        switch (data.status) {
          case 'ok':
            const {
              fake,
              ind,
              m,
            }: { ind: number[]; fake?: number[]; m: number } = data
            dispatch(registrationActions.fetchDone())
            dispatch(commentsActions.setCards({ ind, fake, m }))
            break
          case 'bad':
            setShowNotFound(true)
            dispatch(registrationActions.fetchBad())
            break
        }
      })
      .catch(() => {
        setShowNotFound(true)
        dispatch(registrationActions.fetchBad())
      })
  }

  return (
    <Box
      id="registration-section"
      component="section"
      width={320}
      margin="auto"
      mb={2}
    >
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={showNotFound}
        onClose={() => {
          setShowNotFound(false)
        }}
      >
        <Alert
          onClose={() => {
            setShowNotFound(false)
          }}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {registration.hash} Game ID not found!
        </Alert>
      </Snackbar>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <TextField
          prefixId="registration__name"
          disabled={registration.status !== 'new'}
          iconRender={<PersonIcon />}
          withStackRadius
          value={registration.name}
          onChange={value =>
            dispatch(registrationActions.updateName(value.toUpperCase()))
          }
          withReset={registration.status === 'new'}
          onReset={() => dispatch(registrationActions.updateName(''))}
        />
        <TextField
          prefixId="registration__hash"
          disabled={registration.status !== 'new'}
          iconRender={<HashIcon />}
          value={registration.hash}
          maxChars={10}
          onChange={value =>
            dispatch(registrationActions.updateHash(value.toUpperCase()))
          }
          withReset={registration.status === 'new'}
          onReset={() => dispatch(registrationActions.updateHash(''))}
          customRadius={
            registration.status === 'ready'
              ? theme.spacing(0, 0, 2, 2)
              : undefined
          }
        />
        <Box pt={0.5}>
          <Collapse in={registration.status !== 'ready'}>
            <Button
              aria-label="search"
              disabled={!registration.hash || registration.status !== 'new'}
              fullWidth
              size="large"
              type="submit"
              sx={theme => ({
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: theme.spacing(0, 0, 2, 2),
                fontFamily: 'Kalam',
                fontSize: 24,
                height: theme.spacing(6),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                },
              })}
            >
              {registration.status === 'ready' ? (
                <OkIcon />
              ) : registration.status === 'fetch' ? (
                <LoadIcon
                  sx={{
                    '@keyframes rotation': {
                      from: {
                        transform: 'rotate(0deg)',
                      },
                      to: {
                        transform: 'rotate(359deg)',
                      },
                    },
                    animation: 'rotation 2s infinite linear',
                  }}
                />
              ) : (
                <SearchIcon />
              )}
            </Button>
          </Collapse>
        </Box>
      </form>
    </Box>
  )
}

export default Registration
