import DrawIcon from '@mui/icons-material/GestureRounded'
import TextIcon from '@mui/icons-material/KeyboardRounded'
import CardIcon from '@mui/icons-material/ViewModuleRounded'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { FC, useState } from 'react'
import { useMount } from 'react-use'
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

  useMount(() => {
    setShowInput(true)
  })

  return (
    <Box key={verifier} mb={!noDivider ? 4 : undefined}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={0.5}
      >
        <Box ml={1.75}>
          <SingleCharLabel>{verifier}</SingleCharLabel>
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              setShowInput(true)
              setShowDrawing(false)
            }}
            color={showInput ? 'primary' : 'default'}
          >
            <TextIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowInput(false)
              setShowDrawing(true)
            }}
            color={showDrawing ? 'primary' : 'default'}
          >
            <DrawIcon />
          </IconButton>
          <IconButton disabled>
            <CardIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={showInput} sx={{ position: 'relative' }}>
        <InputComment verifier={verifier} />
      </Collapse>
      <Collapse in={showDrawing} sx={{ position: 'relative' }}>
        <DrawingComment verifier={verifier} />
      </Collapse>
    </Box>
  )
}

export default Comment
