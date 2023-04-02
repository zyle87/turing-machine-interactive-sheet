import Check from '@mui/icons-material/CheckBoxRounded'
import Clear from '@mui/icons-material/FormatClearRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import ShapeIcon from 'components/ShapeIcon'
import SingleCharLabel from 'components/SingleCharLabel'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useState } from 'react'
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

  return (
    <Paper sx={{ width: 320, p: 2, mb: 2 }}>
      <Button
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
                    ideas: value,
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
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                padding: theme.spacing(1),
                paddingRight: theme.spacing(4),
                borderRadius: theme.spacing(2, 2, 0, 0),
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            px={2}
            my={currentVerifier === verifier ? 0.5 : 0.25}
            height={currentVerifier === verifier ? theme.spacing(4) : 0}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              overflow: 'hidden',
              transition: theme.transitions.create('height'),
            }}
          >
            {(['triangle', 'square', 'circle'] as Shape[]).map(shape => (
              <Box key={shape} display="flex" alignItems="center">
                <Box mr={1}>
                  <Typography>
                    :{shape[0]}
                    {shape[1]}: =
                  </Typography>
                </Box>
                <ShapeIcon shape={shape} sizeMultiplier={0.5} />
              </Box>
            ))}
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
                    result: value,
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
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                padding: theme.spacing(1),
                borderRadius: theme.spacing(0, 0, 2, 2),
                paddingRight: theme.spacing(5),
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
