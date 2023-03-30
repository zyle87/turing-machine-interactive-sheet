import Add from '@mui/icons-material/AddTaskRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import ShapeIcon from 'components/ShapeIcon'
import TextField from 'components/TextField'
import { FC } from 'react'

const Composition: FC = () => {
  const theme = useTheme()

  return (
    <Paper component="section" sx={{ mb: 2 }}>
      <Box
        sx={theme => ({
          padding: theme.spacing(2),
        })}
      >
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {['triangle', 'square', 'circle'].map(shape => (
            <Grid key={shape} item xs={4}>
              <TextField
                type="number"
                iconRender={
                  <ShapeIcon
                    shape={shape as 'triangle' | 'square' | 'circle'}
                    size={16}
                  />
                }
                customRadius={
                  shape !== 'square'
                    ? shape === 'triangle'
                      ? theme.spacing(1.5, 0, 0, 0)
                      : theme.spacing(0, 1.5, 0, 0)
                    : undefined
                }
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          {new Array(6).fill(0).map((_, index) => (
            <Grid item xs={2} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  background: index === 4 || index === 5 ? '#e9f8f0' : null,
                }}
              >
                <Typography
                  variant="h6"
                  sx={theme => ({
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                  })}
                >
                  {index}
                </Typography>
              </Box>
            </Grid>
          ))}
          {['A', 'B', 'C', 'D', 'E', 'F'].map(verifier => (
            <Grid item xs={2} key={verifier}>
              <Box
                sx={{
                  textAlign: 'center',
                  background:
                    verifier === 'E' || verifier === 'F' ? '#e9f8f0' : null,
                  marginTop: theme.spacing(-1),
                }}
              >
                <IconButton color="primary" sx={{ mb: 0.5 }}>
                  <Box
                    height={20}
                    width={20}
                    sx={theme => ({
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderColor: theme.palette.primary.main,
                      borderRadius: theme.spacing(0.5),
                    })}
                  />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
      <Box p={2}>
        <Button
          fullWidth
          size="large"
          sx={theme => ({ borderRadius: theme.spacing(0, 0, 1.5, 1.5) })}
        >
          <Add />
        </Button>
      </Box>
    </Paper>
  )
}

export default Composition
