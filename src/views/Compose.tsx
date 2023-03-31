import Add from '@mui/icons-material/AddTaskRounded'
import Clear from '@mui/icons-material/LayersClearRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Composition from 'components/Composition'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { composeActions } from 'store/slices/composeSlice'

const Compose: FC = () => {
  const compose = useAppSelector(state => state.compose)
  const dispatch = useAppDispatch()

  return (
    <Paper component="section" sx={{ width: 320 }}>
      <Box p={1.5}>
        <Button
          fullWidth
          color="secondary"
          size="large"
          sx={theme => ({ borderRadius: theme.spacing(1.5) })}
          onClick={() => {
            dispatch(composeActions.resetCompose())
          }}
        >
          <Clear />
        </Button>
      </Box>
      <Box px={1.5}>
        <Divider />
      </Box>
      <Box p={1.5} pb={0}>
        {compose.map((composition, index) => (
          <Composition key={index} composition={composition} index={index} />
        ))}
      </Box>
      <Box p={1.5} pt={0}>
        <Button
          fullWidth
          size="large"
          sx={theme => ({ borderRadius: theme.spacing(1.5) })}
          onClick={() => {
            dispatch(composeActions.addComposition())
          }}
        >
          <Add />
        </Button>
      </Box>
    </Paper>
  )
}

export default Compose
