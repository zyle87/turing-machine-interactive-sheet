import Add from '@mui/icons-material/AddTaskRounded'
import Clear from '@mui/icons-material/LayersClearRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import CompositionEntry from 'components/CompositionEntry'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { compositionActions } from 'store/slices/compositionSlice'

const Composition: FC = () => {
  const dispatch = useAppDispatch()
  const composition = useAppSelector(state => state.composition)

  return (
    <Paper component="section" sx={{ width: 320 }}>
      <Box p={2}>
        <Button
          fullWidth
          color="secondary"
          size="large"
          onClick={() => {
            dispatch(compositionActions.resetComposition())
          }}
        >
          <Clear />
        </Button>
      </Box>
      <Box px={2}>
        <Divider />
      </Box>
      <Box p={2} pb={0}>
        {composition.map((entry, index) => (
          <CompositionEntry key={index} entry={entry} index={index} />
        ))}
      </Box>
      <Box p={2} pt={0}>
        <Button
          fullWidth
          size="large"
          onClick={() => {
            dispatch(compositionActions.addComposition())
          }}
        >
          <Add />
        </Button>
      </Box>
    </Paper>
  )
}

export default Composition
