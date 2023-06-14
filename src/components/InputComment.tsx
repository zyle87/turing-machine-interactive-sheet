import CheckIcon from '@mui/icons-material/CheckBoxRounded'
import QuestionIcon from '@mui/icons-material/HelpCenterRounded'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useMemo, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { commentsActions } from 'store/slices/commentsSlice'

type Props = {
  verifier: Verifier
}

const InputComment: FC<Props> = ({ verifier }) => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments)
  const theme = useTheme()

  const [showTooltip, setShowTooltip] = useState(false)

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
    <Box>
      <Box position="relative">
        <Box
          position="absolute"
          top={theme.spacing(1.25)}
          left={
            !comments.find(comment => comment.verifier === verifier)?.assumption
              ? theme.spacing(1)
              : undefined
          }
          right={
            comments.find(comment => comment.verifier === verifier)?.assumption
              ? theme.spacing(1)
              : undefined
          }
          flex={1}
          alignItems="center"
        >
          <QuestionIcon color="primary" />
        </Box>
        <ContentEditable
          aria-multiline
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
            setShowTooltip(true)
            dispatch(
              commentsActions.decodeComment({
                verifier,
                category: 'assumption',
              })
            )
          }}
          onBlur={_ => {
            setShowTooltip(false)
            dispatch(commentsActions.encodeAllComments())
          }}
          style={{
            ...inputStyles,
            marginBottom: theme.spacing(0.5),
          }}
        />
      </Box>
      <Box
        mb={showTooltip ? 0.5 : 0}
        height={showTooltip ? theme.spacing(7) : 0}
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
            ~<span style={{ opacity: 0.2 }}> ... </span>~ ={' '}
            <span style={{ textDecoration: 'line-through' }}>
              {'strikethrough'.toUpperCase()}
            </span>
          </Typography>
        </Box>
      </Box>
      <Box position="relative">
        <Box
          position="absolute"
          top={theme.spacing(1.25)}
          left={
            !comments.find(comment => comment.verifier === verifier)?.conclusion
              ? theme.spacing(1)
              : undefined
          }
          right={
            comments.find(comment => comment.verifier === verifier)?.conclusion
              ? theme.spacing(1)
              : undefined
          }
          flex={1}
          alignItems="center"
        >
          <CheckIcon color="primary" />
        </Box>
        <ContentEditable
          aria-multiline
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
            setShowTooltip(true)
            dispatch(
              commentsActions.decodeComment({
                verifier,
                category: 'conclusion',
              })
            )
          }}
          onBlur={_ => {
            setShowTooltip(false)
            dispatch(commentsActions.encodeAllComments())
          }}
          style={{
            ...inputStyles,
            marginBottom: theme.spacing(0.5),
          }}
        />
      </Box>
    </Box>
  )
}

export default InputComment
