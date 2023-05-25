import Check from '@mui/icons-material/CheckBoxRounded'
import Undo from '@mui/icons-material/UndoRounded'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC, useMemo, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import ContentEditable from 'react-contenteditable'
import { useMeasure, useMount, useUpdateEffect } from 'react-use'
import { commentsActions } from 'store/slices/commentsSlice'
import SingleCharLabel from './SingleCharLabel'

type Props = {
  verifier: Verifier
  noDivider?: boolean
  eraseDrawing?: boolean
}

const Comment: FC<Props> = ({ verifier, noDivider }) => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments)
  const theme = useTheme()

  const [showTooltip, setShowTooltip] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [ref, { width: canvasWidth, height: canvasHeight }] = useMeasure()
  const canvasRef = useRef<CanvasDraw>(null)

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

  const drawing = useMemo(
    () => comments.find(comment => comment.verifier === verifier)?.drawing,
    [comments, verifier]
  )

  useMount(() => {
    setIsMounted(true)
  })

  useUpdateEffect(() => {
    drawing && canvasRef.current?.loadSaveData(drawing)
  }, [isMounted])

  return (
    <Box key={verifier}>
      <Box position="relative">
        <Box
          position="absolute"
          top={theme.spacing(0.5)}
          left={theme.spacing(1.5)}
        >
          <SingleCharLabel>{verifier}</SingleCharLabel>
        </Box>
        <Box
          ref={ref}
          sx={{
            marginBottom: theme.spacing(0.5),
            border: `3px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: theme.spacing(2, 2, 0, 0),
            height: 184,
            backgroundSize: '20px 20px',
            backgroundImage: `linear-gradient(to right, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 1px, transparent 1px), linear-gradient(to bottom, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 1px, transparent 1px);`,
          }}
        >
          {canvasWidth && canvasHeight ? (
            <CanvasDraw
              onChange={draw =>
                dispatch(
                  commentsActions.updateDrawing({
                    verifier,
                    drawing: draw.getSaveData(),
                  })
                )
              }
              saveData={drawing}
              ref={canvasRef}
              brushColor={theme.palette.primary.main}
              brushRadius={1.5}
              immediateLoading
              canvasHeight={canvasHeight}
              canvasWidth={canvasWidth}
              catenaryColor={theme.palette.primary.main}
              gridColor={'rgba(150,150,150,1'}
              hideGrid
              hideInterface
              lazyRadius={0.5}
              style={{
                background: 'none',
                borderRadius: theme.spacing(2, 2, 0, 0),
              }}
            />
          ) : null}
        </Box>
        <Box
          position="absolute"
          top={theme.spacing(0.5)}
          right={theme.spacing(1)}
        >
          <IconButton
            aria-label="undo"
            color="secondary"
            size="small"
            disabled={
              !comments.find(comment => comment.verifier === verifier)
                ?.drawing ||
              comments
                .find(comment => comment.verifier === verifier)
                ?.drawing.split('[]').length === 2 ||
              false
            }
            onClick={() => {
              canvasRef.current?.undo()
            }}
          >
            <Undo />
          </IconButton>
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
          }}
        />
      </Box>
      <Box
        my={showTooltip ? 0.5 : 0.25}
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
            ~<span style={{ opacity: 0.2 }}> ... </span>~ = strikethrough
          </Typography>
        </Box>
      </Box>
      <Box position="relative">
        <Box
          position="absolute"
          top={theme.spacing(1)}
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
            borderRadius: theme.spacing(0, 0, 2, 2),
          }}
        />
      </Box>
      {!noDivider && (
        <Box my={2}>
          <Divider />
        </Box>
      )}
    </Box>
  )
}

export default Comment
