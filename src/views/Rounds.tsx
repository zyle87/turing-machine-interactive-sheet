import Add from '@mui/icons-material/AddTaskRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Round from 'components/Round'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { roundsActions } from 'store/slices/roundsSlice'

const Rounds: FC = () => {
  const dispatch = useAppDispatch()
  const rounds = useAppSelector(state => state.rounds)

  return (
    <Paper
      component="section"
      id="rounds-section"
      sx={{ width: 320, margin: 'auto' }}
    >
      <Box p={2} pb={0}>
        {rounds.map((round, index) => (
          <Round key={index} round={round} index={index} />
        ))}
      </Box>
      <Box p={2} pt={0}>
        <Button
          id="rounds__add-round-button"
          aria-label="add"
          fullWidth
          size="large"
          onClick={() => {
            dispatch(roundsActions.addRound())
          }}
        >
          <Add />
        </Button>
      </Box>
    </Paper>
  )
}

export default Rounds
