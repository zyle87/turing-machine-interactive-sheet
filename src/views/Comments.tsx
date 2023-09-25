import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Comment from 'components/Comment'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'

const Comments: FC = () => {
  const registration = useAppSelector(state => state.registration)
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Paper
      component="section"
      sx={{ width: isUpMd ? 656 : 320, margin: theme.spacing(0, 'auto', 2) }}
    >
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            {(isUpMd
              ? (['A', 'C', 'E'] as Verifier[])
              : (['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[])
            ).map(verifier => (
              <Comment
                key={verifier}
                verifier={verifier}
                noDivider={isUpMd ? verifier === 'E' : verifier === 'F'}
              />
            ))}
          </Grid>
          {isUpMd && (
            <Grid item md={6} xs={12}>
              {(['B', 'D', 'F'] as Verifier[]).map(verifier => (
                <Comment
                  key={verifier}
                  verifier={verifier}
                  noDivider={verifier === 'F'}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default Comments
