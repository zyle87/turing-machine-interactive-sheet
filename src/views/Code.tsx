import Incorrect from '@mui/icons-material/HorizontalRuleRounded'
import Clear from '@mui/icons-material/KeyOffRounded'
import Correct from '@mui/icons-material/PanoramaFishEye'
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
import { codeActions } from 'store/slices/codeSlice'

const Code: FC = () => {
  const dispatch = useAppDispatch()
  const code = useAppSelector(state => state.code)

  return (
    <Paper sx={{ py: 2, width: 320 }}>
      <Box mx={2}>
        <Box mb={2}>
          <Button
            aria-label="clear"
            fullWidth
            color="secondary"
            onClick={() => {
              dispatch(codeActions.resetCode())
            }}
            size="large"
          >
            <Clear />
          </Button>
        </Box>
        <Box mb={2}>
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
                  aria-label={`${shape} ${digit}`}
                  color="primary"
                  sx={theme => ({
                    height: theme.spacing(6),
                    width: theme.spacing(6),
                  })}
                  onClick={() => {
                    dispatch(
                      codeActions.toggleDigit({
                        shape,
                        digit,
                      })
                    )
                  }}
                >
                  <SingleCharLabel>{digit}</SingleCharLabel>
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    sx={theme => ({ color: theme.palette.text.primary })}
                  >
                    {code.find(
                      entry => entry.shape === shape && entry.digit === digit
                    )?.state === 'correct' && <Correct fontSize="large" />}
                    {code.find(
                      entry => entry.shape === shape && entry.digit === digit
                    )?.state === 'incorrect' && (
                      <Incorrect
                        fontSize="large"
                        sx={{ transform: 'rotate(-45deg)' }}
                      />
                    )}
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

export default Code
