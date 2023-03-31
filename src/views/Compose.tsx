import Add from '@mui/icons-material/AddTaskRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Composition from 'components/Composition'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'

const Compose: FC = () => {
  const compose = useAppSelector(state => state.compose)

  return (
    <Paper component="section" sx={{ mb: 2 }}>
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
        >
          <Add />
        </Button>
      </Box>
    </Paper>
  )
}

export default Compose
