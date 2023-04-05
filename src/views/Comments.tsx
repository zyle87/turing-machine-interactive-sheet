import Check from '@mui/icons-material/CheckBoxRounded'
import Clear from '@mui/icons-material/CommentsDisabled'
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
import { commentsActions } from 'store/slices/commentsSlice'

const Comments: FC = () => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments)
  const theme = useTheme()

  const [currentVerifier, setCurrentVerifier] = useState('')

  useMount(() => {
    dispatch(commentsActions.encodeAllComments())
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
          dispatch(commentsActions.clearComments())
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
                comments.find(comment => comment.verifier === verifier)
                  ?.assumption
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
                  commentsActions.updateAssumption({
                    verifier,
                    assumption: value.toLowerCase(),
                  })
                )
              }}
              html={
                comments.find(comment => comment.verifier === verifier)
                  ?.assumption || ''
              }
              onFocus={_ => {
                setCurrentVerifier(verifier)
                dispatch(
                  commentsActions.decodeComment({
                    verifier,
                    category: 'assumption',
                  })
                )
              }}
              onBlur={_ => {
                setCurrentVerifier('')
                dispatch(commentsActions.encodeAllComments())
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
                comments.find(comment => comment.verifier === verifier)
                  ?.conclusion
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
                  commentsActions.updateConclusion({
                    verifier,
                    conclusion: value.toLowerCase(),
                  })
                )
              }}
              html={
                comments.find(comment => comment.verifier === verifier)
                  ?.conclusion || ''
              }
              onFocus={_ => {
                setCurrentVerifier(verifier)
                dispatch(
                  commentsActions.decodeComment({
                    verifier,
                    category: 'conclusion',
                  })
                )
              }}
              onBlur={_ => {
                setCurrentVerifier('')
                dispatch(commentsActions.encodeAllComments())
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

export default Comments
