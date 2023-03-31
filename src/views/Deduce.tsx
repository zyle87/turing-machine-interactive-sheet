import Incorrect from '@mui/icons-material/CloseRounded'
import Correct from '@mui/icons-material/PanoramaFishEye'
import Clear from '@mui/icons-material/RestartAltRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import ShapeIcon from 'components/ShapeIcon'
import SingleCharLabel from 'components/SingleCharLabel'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { deduceActions } from 'store/slices/deduceSlice'

const Deduce: FC = () => {
  const dispatch = useAppDispatch()
  const deduce = useAppSelector(state => state.deduce)

  return (
    <Paper sx={{ py: 1.5 }}>
      <Box mx={1.5}>
        <Box mb={1.5}>
          <Button
            fullWidth
            color="secondary"
            onClick={() => {
              dispatch(deduceActions.resetDeduce())
            }}
          >
            <Clear />
          </Button>
        </Box>
        <Box mb={1.5}>
          <Divider />
        </Box>
      </Box>
      <Grid container>
        {(['triangle', 'square', 'circle'] as Shape[]).map((shape, index) => (
          <Grid key={shape} item xs={4} sx={{ textAlign: 'center' }}>
            <Box
              width={1}
              mb={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ShapeIcon shape={shape as 'triangle' | 'square' | 'circle'} />
            </Box>
            {([5, 4, 3, 2, 1] as Digit[]).map(digit => (
              <Box key={digit} width={1} position="relative">
                <IconButton
                  color="primary"
                  sx={theme => ({
                    height: theme.spacing(6),
                    width: theme.spacing(6),
                  })}
                  onClick={() => {
                    dispatch(
                      deduceActions.toggleDeduction({
                        shape,
                        digit,
                      })
                    )
                  }}
                >
                  <SingleCharLabel>{digit}</SingleCharLabel>
                  <Box
                    position="absolute"
                    top={-4}
                    left={4}
                    sx={theme => ({ color: theme.palette.text.primary })}
                  >
                    {deduce.find(
                      deduction =>
                        deduction.shape === shape && deduction.digit === digit
                    )?.state === 'correct' && <Correct fontSize="large" />}
                    {deduce.find(
                      deduction =>
                        deduction.shape === shape && deduction.digit === digit
                    )?.state === 'incorrect' && <Incorrect fontSize="large" />}
                  </Box>
                </IconButton>
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Deduce
