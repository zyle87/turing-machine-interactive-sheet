import Typography from '@mui/material/Typography'
import { FC, PropsWithChildren } from 'react'

export const Label: FC<PropsWithChildren> = props => (
  <Typography
    variant="h6"
    sx={theme => ({
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    })}
  >
    {props.children}
  </Typography>
)
