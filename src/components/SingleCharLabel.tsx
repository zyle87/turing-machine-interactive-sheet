import Typography from '@mui/material/Typography'
import { FC, PropsWithChildren } from 'react'

const SingleCharLabel: FC<PropsWithChildren> = props => (
  <Typography
    variant="h6"
    sx={theme => ({
      color: theme.palette.primary.main,
      fontWeight: 800,
    })}
  >
    {props.children}
  </Typography>
)

export default SingleCharLabel
