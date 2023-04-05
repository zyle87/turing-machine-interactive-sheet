import Check from '@mui/icons-material/CheckBoxRounded'
import Clear from '@mui/icons-material/FormatClearRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import SingleCharLabel from 'components/SingleCharLabel'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useMemo, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { useMount } from 'react-use'
import { deductionActions } from 'store/slices/deductionSlice'

const Deduction: FC = () => {
  const dispatch = useAppDispatch()
  const deduction = useAppSelector(state => state.deduction)
  const theme = useTheme()

  const [currentVerifier, setCurrentVerifier] = useState('')

  useMount(() => {
    dispatch(deductionActions.encodeAllDeduction())
  })

  const inputStyles = useMemo(
    () => ({
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      padding: theme.spacing(1),
      paddingRight: theme.spacing(5),
      minHeight: theme.spacing(6),
      textTransform: 'uppercase',
      lineHeight: 1.7,
    }),
    [theme]
  )

  return (
    <Paper sx={{ width: 320, p: 2, mb: 2 }}>
      <Button
        aria-label="clear"
        fullWidth
        color="secondary"
        size="large"
        onClick={() => {
          dispatch(deductionActions.clearDeduction())
        }}
      >
        <Clear />
      </Button>
      <Box py={2}>
        <Divider />
      </Box>
      {(['A', 'B', 'C', 'D', 'E', 'F'] as Verifier[]).map(verifier => (
        <Box key={verifier}>
          <Box position="relative">
            <Box
              position="absolute"
              top={theme.spacing(0.5)}
              left={
                deduction.find(entry => entry.verifier === verifier)?.ideas
                  ? theme.spacing(32.5)
                  : theme.spacing(1.5)
              }
              sx={{ transition: theme.transitions.create('left') }}
            >
              <SingleCharLabel>{verifier}</SingleCharLabel>
            </Box>
            <ContentEditable
              onChange={event => {
                const value =
                  event.target.value === '<div><br></div>' ||
                  event.target.value === '<br>'
                    ? ''
                    : event.target.value

                dispatch(
                  deductionActions.updateIdeas({
                    verifier,
                    ideas: value.toLowerCase(),
                  })
                )
              }}
              html={
                deduction.find(entry => entry.verifier === verifier)?.ideas ||
                ''
              }
              onFocus={_ => {
                setCurrentVerifier(verifier)
                dispatch(
                  deductionActions.decodeDeduction({ verifier, type: 'ideas' })
                )
              }}
              onBlur={_ => {
                setCurrentVerifier('')
                dispatch(deductionActions.encodeAllDeduction())
              }}
              style={{
                ...inputStyles,
                borderRadius: theme.spacing(2, 2, 0, 0),
              }}
            />
          </Box>
          <Box
            my={currentVerifier === verifier ? 0.5 : 0.25}
            height={currentVerifier === verifier ? theme.spacing(7) : 0}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
              overflow: 'hidden',
              transition: theme.transitions.create('height'),
            }}
          >
            <Box display="flex" justifyContent="space-between" px={2}>
              {(['triangle', 'square', 'circle'] as Shape[]).map(shape => (
                <Box key={shape} display="flex" alignItems="center">
                  <Box mr={1}>
                    <Typography>
                      :{shape[0].toUpperCase()}
                      {shape[1].toUpperCase()}: =
                      {shape === 'triangle' && (
                        <span style={{ fontFamily: 'Shapes' }}> i</span>
                      )}
                      {shape === 'square' && (
                        <span style={{ fontFamily: 'Shapes' }}> j</span>
                      )}
                      {shape === 'circle' && (
                        <span style={{ fontFamily: 'Shapes' }}> g</span>
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box textAlign="center">
              <Typography>
                ~<span style={{ opacity: 0.2 }}> ... </span>~ = strikethrough
              </Typography>
            </Box>
          </Box>
          <Box position="relative">
            <Box
              position="absolute"
              top={theme.spacing(1)}
              left={
                deduction.find(entry => entry.verifier === verifier)?.result
                  ? theme.spacing(31.5)
                  : theme.spacing(1)
              }
              sx={{ transition: theme.transitions.create('left') }}
            >
              <Check color="primary" />
            </Box>
            <ContentEditable
              onChange={event => {
                const value =
                  event.target.value === '<div><br></div>' ||
                  event.target.value === '<br>'
                    ? ''
                    : event.target.value

                dispatch(
                  deductionActions.updateResult({
                    verifier,
                    result: value.toLowerCase(),
                  })
                )
              }}
              html={
                deduction.find(entry => entry.verifier === verifier)?.result ||
                ''
              }
              onFocus={_ => {
                setCurrentVerifier(verifier)
                dispatch(
                  deductionActions.decodeDeduction({ verifier, type: 'result' })
                )
              }}
              onBlur={_ => {
                setCurrentVerifier('')
                dispatch(deductionActions.encodeAllDeduction())
              }}
              style={{
                ...inputStyles,
                borderRadius: theme.spacing(0, 0, 2, 2),
              }}
            />
          </Box>
          {verifier !== 'F' && (
            <Box my={2}>
              <Divider />
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  )
}

export default Deduction
