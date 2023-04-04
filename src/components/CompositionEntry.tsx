import Correct from '@mui/icons-material/CheckRounded'
import Incorrect from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { FC } from 'react'
import {
  CompositionState,
  compositionActions,
} from 'store/slices/compositionSlice'
import ShapeIcon from './ShapeIcon'
import SingleCharLabel from './SingleCharLabel'
import TextField from './TextField'

type Props = {
  entry: CompositionState[number]
  index: number
}

const CompositionEntry: FC<Props> = ({ entry, index }) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  return (
    <Box>
      <Grid container spacing={0.5}>
        {entry.proposals.map(proposal => (
          <Grid key={proposal.shape} item xs={4}>
            <TextField
              customRadius={
                proposal.shape !== 'square'
                  ? proposal.shape === 'triangle'
                    ? theme.spacing(2, 0, 0, 0)
                    : theme.spacing(0, 2, 0, 0)
                  : undefined
              }
              value={proposal.digit}
              onChange={value => {
                dispatch(
                  compositionActions.updateProposalDigit({
                    index,
                    shape: proposal.shape,
                    digit: value ? (Number(value) as Digit) : null,
                  })
                )
              }}
              iconRender={
                <ShapeIcon
                  shape={proposal.shape as 'triangle' | 'square' | 'circle'}
                  sizeMultiplier={0.5}
                />
              }
              type="number"
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={0.5}>
        <Grid container spacing={0.5}>
          {entry.answers.map(answer => (
            <Grid item xs={2} key={answer.verifier}>
              <Button
                arial-label={answer.verifier}
                sx={{
                  minWidth: '100%',
                  p: 0,
                  borderRadius: theme.spacing(
                    0,
                    0,
                    answer.verifier === 'F' ? 2 : 0,
                    answer.verifier === 'A' ? 2 : 0
                  ),
                }}
                onClick={() => {
                  dispatch(
                    compositionActions.updateAnswerState({
                      index,
                      verifier: answer.verifier,
                    })
                  )
                }}
              >
                <Box width={1}>
                  <Box
                    pt={1}
                    sx={theme => ({
                      textAlign: 'center',
                      background:
                        answer.verifier === 'E' || answer.verifier === 'F'
                          ? alpha(theme.palette.primary.main, 0.1)
                          : null,
                      borderRadius:
                        answer.verifier === 'F'
                          ? theme.spacing(0, 0, 2, 0)
                          : null,
                    })}
                  >
                    <SingleCharLabel>{answer.verifier}</SingleCharLabel>
                    <Box pt={1} pb={2} position="relative">
                      <Box
                        height={20}
                        margin="auto"
                        width={20}
                        sx={theme => ({
                          borderWidth: 2,
                          borderStyle: 'solid',
                          borderColor: theme.palette.primary.main,
                          borderRadius: theme.spacing(0.5),
                        })}
                      />
                      <Box
                        position="absolute"
                        top={-2}
                        left={3}
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {answer.state === 'correct' && (
                          <Correct fontSize="large" />
                        )}
                        {answer.state === 'incorrect' && (
                          <Incorrect fontSize="large" />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={2}>
        <Divider />
      </Box>
    </Box>
  )
}

export default CompositionEntry
