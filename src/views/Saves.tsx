import UploadIcon from '@mui/icons-material/AddCircleOutlineRounded'
import LoadIcon from '@mui/icons-material/ContentPasteGoRounded'
import DeleteIcon from '@mui/icons-material/ContentPasteOffRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
}

const Saves: FC<Props> = props => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const theme = useTheme()

  return (
    <Dialog onClose={props.onClose} open={props.isOpen}>
      <List sx={{ width: 320, p: 2 }}>
        {state.saves.map((save, index) => (
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
                    dispatch(commentsActions.load(save.comments))
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
  )
}

export default Saves
