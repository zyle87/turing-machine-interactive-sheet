import LoadIcon from '@mui/icons-material/ContentPasteGoRounded'
import DeleteIcon from '@mui/icons-material/ContentPasteOffRounded'
import Hourglass from '@mui/icons-material/HourglassEmptyRounded'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { commentsActions } from 'store/slices/commentsSlice'
import { digitCodeActions } from 'store/slices/digitCodeSlice'
import { registrationActions } from 'store/slices/registrationSlice'
import { roundsActions } from 'store/slices/roundsSlice'
import { savesActions } from 'store/slices/savesSlice'

type Props = {
  isOpen: boolean
  onClose: () => void
  onLoad?: () => void
}

const Saves: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const theme = useTheme()

  return (
    <Dialog onClose={props.onClose} open={props.isOpen}>
      <List sx={{  p: 2 }}>
        {state.saves.length === 0 ? (
          <Box textAlign="center">
            <Hourglass color="primary" />
          </Box>
        ) : (
          [...state.saves].reverse().map((save, index) => (
            <Box key={save.date}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width={1}
                mr={2}
              >
                <Box>
                  <Typography>{save.registration.name} - #{save.registration.hash}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {new Date(save.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </Typography>
                </Box>
                <Box display="flex">
                  <IconButton
                    aria-label="load"
                    color="primary"
                    onClick={() => {
                      dispatch(digitCodeActions.load(save.digitCode))
                      dispatch(roundsActions.load(save.rounds))
                      dispatch(commentsActions.load(save.comments))
                      dispatch(registrationActions.load(save.registration))
                      props.onLoad && props.onLoad()
                    }}
                  >
                    <LoadIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => {
                      dispatch(savesActions.deleteSave(save.date))
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              {index !== state.saves.length - 1 && (
                <Box my={2}>
                  <Divider />
                </Box>
              )}
            </Box>
          ))
        )}
      </List>
    </Dialog>
  )
}

export default Saves
