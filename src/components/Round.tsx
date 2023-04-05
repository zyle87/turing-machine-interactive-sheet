import Solved from '@mui/icons-material/CheckRounded'
import Unsolved from '@mui/icons-material/CloseRounded'
import Delete from '@mui/icons-material/UndoRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { FC, useState } from 'react'
import { RoundsState, roundsActions } from 'store/slices/roundsSlice'
import ShapeIcon from './ShapeIcon'
import SingleCharLabel from './SingleCharLabel'
import TextField from './TextField'
import { useUpdateEffect } from 'react-use'

type Props = {
  round: RoundsState[number]
  index: number
  onDelete: () => void
}

const Round: FC<Props> = ({ round, index, onDelete }) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  return (
    <Box>
      <Grid container spacing={0.5}>
        {round.code.map(code => (
          <Grid key={code.shape} item xs={4}>
            <TextField
              customRadius={
                code.shape !== 'square'
                  ? code.shape === 'triangle'
                    ? theme.spacing(2, 0, 0, 0)
                    : theme.spacing(0, 2, 0, 0)
                  : undefined
              }
              value={code.digit}
              onChange={value => {
                dispatch(
                  roundsActions.updateCodeDigit({
                    index,
                    shape: code.shape,
                    digit: value ? (Number(value) as Digit) : null,
                  })
                )
              }}
              iconRender={
                <ShapeIcon
                  shape={code.shape as 'triangle' | 'square' | 'circle'}
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
          {round.queries.map(query => (
            <Grid item xs={2} key={query.verifier}>
              <Button
                arial-label={query.verifier}
                sx={{
                  minWidth: '100%',
                  p: 0,
                  borderRadius: theme.spacing(
                    0,
                    0,
                    query.verifier === 'F' ? 2 : 0,
                    query.verifier === 'A' ? 2 : 0
                  ),
                }}
                onClick={() => {
                  dispatch(
                    roundsActions.updateQueryState({
                      index,
                      verifier: query.verifier,
                    })
                  )
                }}
              >
                <Box width={1}>
                  <Box
                    pt={1}
                    sx={{
                      textAlign: 'center',
                      background:
                        query.verifier === 'E' || query.verifier === 'F'
                          ? alpha(theme.palette.primary.main, 0.1)
                          : null,
                      borderRadius:
                        query.verifier === 'F'
                          ? theme.spacing(0, 0, 2, 0)
                          : null,
                    }}
                  >
                    <SingleCharLabel>{query.verifier}</SingleCharLabel>
                    <Box pt={1} pb={2} position="relative">
                      <Box
                        height={20}
                        margin="auto"
                        width={20}
                        sx={{
                          borderWidth: 2,
                          borderStyle: 'solid',
                          borderColor: theme.palette.primary.main,
                          borderRadius: theme.spacing(0.5),
                        }}
                      />
                      <Box
                        position="absolute"
                        top={-2}
                        left={3}
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {query.state === 'solved' && (
                          <Solved fontSize="large" />
                        )}
                        {query.state === 'unsolved' && (
                          <Unsolved fontSize="large" />
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
      {round.isPristine && (
        <Box>
          <Box mt={2}>
            <Button
              aria-label="delete"
              color="secondary"
              fullWidth
              size="small"
              onClick={onDelete}
            >
              <Delete />
            </Button>
          </Box>
        </Box>
      )}
      <Box my={2}>
        <Divider />
      </Box>
    </Box>
  )
}

export default Round
