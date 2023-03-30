import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Label } from 'components/Label'
import ShapeIcon from 'components/ShapeIcon'
import { FC } from 'react'

const Hypothesis: FC = () => {
  return (
    <Paper
      sx={theme => ({
        padding: theme.spacing(2),
        mb: 2,
      })}
    >
      <Grid container>
        {['triangle', 'square', 'circle'].map(shape => (
          <Grid key={shape} item xs={4} sx={{ textAlign: 'center' }}>
            <ShapeIcon shape={shape as 'triangle' | 'square' | 'circle'} />
          </Grid>
        ))}
      </Grid>
      {[5, 4, 3, 2, 1].map(num => (
        <Grid container key={num}>
          {['triangle', 'square', 'circle'].map(shape => (
            <Grid key={shape} item xs={4} sx={{ textAlign: 'center' }}>
              <IconButton
                color="primary"
                sx={theme => ({
                  height: theme.spacing(6),
                  width: theme.spacing(6),
                })}
              >
                <Label>{num}</Label>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      ))}
    </Paper>
  )
}

export default Hypothesis
