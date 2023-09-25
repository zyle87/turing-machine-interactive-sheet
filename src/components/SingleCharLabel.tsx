import Typography from '@mui/material/Typography'
import { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  white?: boolean
}

const SingleCharLabel: FC<Props> = props => (
  <Typography
    component="span"
    variant="h6"
    sx={theme => ({
      color: props.white
        ? theme.palette.common.white
        : theme.palette.primary.main,
      fontWeight: 800,
    })}
  >
    {props.children}
  </Typography>
)

export default SingleCharLabel
