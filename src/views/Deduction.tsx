import Check from '@mui/icons-material/CheckBoxRounded'
import Clear from '@mui/icons-material/FormatClearRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import TextField from 'components/TextField'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import ContentEditable from 'react-contenteditable'
import { useMount } from 'react-use'
import { deductionActions } from 'store/slices/deductionSlice'

const Deduction: FC = () => {
  const dispatch = useAppDispatch()
  const deduction = useAppSelector(state => state.deduction)
  const theme = useTheme()

  useMount(() => {
    dispatch(deductionActions.encodeDeduction())
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
        <Box key={verifier} position="relative">
          <ContentEditable
            onChange={event => {
              dispatch(
                deductionActions.updateIdeas({
                  verifier,
                  ideas: event.target.value,
                })
              )
            }}
            html={
              deduction.find(entry => entry.verifier === verifier)?.ideas || ''
            }
            onFocus={_ => {
              dispatch(deductionActions.decodeDeduction())
            }}
            onBlur={_ => {
              dispatch(deductionActions.encodeDeduction())
            }}
          />
          <Box mt={0.5}>
            <TextField
              iconRender={<Check fontSize="small" color="primary" />}
              customRadius={theme.spacing(0, 0, 2, 2)}
              customFontSize={theme.spacing(2.5)}
              onChange={value => {
                dispatch(
                  deductionActions.updateResult({
                    verifier,
                    result: value,
                  })
                )
              }}
              value={
                deduction.find(entry => entry.verifier === verifier)?.result ??
                ''
              }
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
