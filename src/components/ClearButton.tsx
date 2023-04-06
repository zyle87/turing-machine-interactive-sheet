import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { FC, ReactNode } from 'react'

type Props = {
  prefixId: string
  iconRender: ReactNode
  onClick: () => void
}

const ClearButton: FC<Props> = props => (
  <Box>
    <Box p={2}>
      <Button
        aria-label={`clear ${props.prefixId}`}
        color="secondary"
        fullWidth
        id={`${props.prefixId}__clear-button`}
        onClick={props.onClick}
        size="large"
      >
        {props.iconRender}
      </Button>
    </Box>
    <Box px={2}>
      <Divider />
    </Box>
  </Box>
)

export default ClearButton
