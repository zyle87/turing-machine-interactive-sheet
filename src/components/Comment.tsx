import DrawIcon from '@mui/icons-material/GestureRounded'
import TextIcon from '@mui/icons-material/SubjectRounded'
import CardIcon from '@mui/icons-material/ViewModuleRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import { FC, useState } from 'react'
import DrawingComment from './DrawingComment'
import InputComment from './InputComment'
import SingleCharLabel from './SingleCharLabel'

type Props = {
  verifier: Verifier
  noDivider?: boolean
}

const Comment: FC<Props> = ({ verifier, noDivider }) => {
  const [showDrawing, setShowDrawing] = useState(false)
  const [showInput, setShowInput] = useState(false)

  return (
    <Box key={verifier}>
      <Box textAlign="center" mb={2}>
        <SingleCharLabel>{verifier}</SingleCharLabel>
      </Box>
      <Button
        fullWidth
        onClick={() => {
          setShowDrawing(!showDrawing)
        }}
        sx={theme => ({
          borderRadius: theme.spacing(2, 2, 0, 0),
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          marginBottom: theme.spacing(0.5),
          height: 48,
        })}
      >
        <DrawIcon />
      </Button>
      <Collapse in={showDrawing} sx={{ position: 'relative' }}>
        <DrawingComment verifier={verifier} />
      </Collapse>
      <Button
        fullWidth
        onClick={() => {
          setShowInput(!showInput)
        }}
        sx={theme => ({
          borderRadius: 0,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          marginBottom: theme.spacing(0.5),
          height: 48,
        })}
      >
        <TextIcon />
      </Button>
      <Collapse in={showInput} sx={{ position: 'relative' }}>
        <InputComment verifier={verifier} />
      </Collapse>
      <Button
        fullWidth
        sx={theme => ({
          borderRadius: 0,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          marginBottom: theme.spacing(0.5),
          height: 48,
        })}
      >
        <CardIcon />I
      </Button>
      <Button
        fullWidth
        sx={theme => ({
          borderRadius: theme.spacing(0, 0, 2, 2),
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          marginBottom: theme.spacing(0.5),
          height: 48,
        })}
      >
        <CardIcon />
        II
      </Button>
      {!noDivider && (
        <Box my={2}>
          <Divider />
        </Box>
      )}
    </Box>
  )
}

export default Comment
