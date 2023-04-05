import Add from '@mui/icons-material/AddTaskRounded'
import Clear from '@mui/icons-material/RemoveDoneRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
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
    <Paper component="section" sx={{ width: 320 }}>
      <Box p={2}>
        <Button
          aria-label="clear"
          fullWidth
          color="secondary"
          size="large"
          onClick={() => {
            dispatch(roundsActions.resetRounds())
          }}
        >
          <Clear />
        </Button>
      </Box>
      <Box px={2}>
        <Divider />
      </Box>
      <Box p={2} pb={0}>
        {rounds.map((round, index) => (
          <Round
            key={index}
            round={round}
            index={index}
            onDelete={() => {
              dispatch(roundsActions.deleteRound(index))
            }}
          />
        ))}
      </Box>
      <Box p={2} pt={0}>
        <Button
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
