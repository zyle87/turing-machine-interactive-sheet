import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import ShapeIcon from 'components/ShapeIcon'
import SingleCharLabel from 'components/SingleCharLabel'
import { FC } from 'react'

const Hypothesis: FC = () => {
  return (
    <Paper sx={{ mb: 1 }}>
      <Grid container>
        {['triangle', 'square', 'circle'].map(shape => (
          <Grid
            key={shape}
            item
            xs={4}
            sx={{ textAlign: 'center', display: 'flex' }}
          >
            <Box width={1} mt={2}>
              <ShapeIcon shape={shape as 'triangle' | 'square' | 'circle'} />
            </Box>
            {shape !== 'circle' && <Divider orientation="vertical" />}
          </Grid>
        ))}
      </Grid>
      {[5, 4, 3, 2, 1].map(num => (
        <Grid container key={num}>
          {new Array(3).fill(0).map((_, index) => (
            <Grid
              key={index}
              item
              xs={4}
              sx={{ textAlign: 'center', display: 'flex' }}
            >
              <Box width={1} mb={num === 1 ? num : undefined}>
                <IconButton
                  color="primary"
                  sx={theme => ({
                    height: theme.spacing(6),
                    width: theme.spacing(6),
                  })}
                >
                  <SingleCharLabel>{num}</SingleCharLabel>
                </IconButton>
              </Box>
              {index !== 2 && <Divider orientation="vertical" />}
            </Grid>
          ))}
        </Grid>
      ))}
    </Paper>
  )
}

export default Hypothesis
